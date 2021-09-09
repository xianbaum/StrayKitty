export class TimestampCalculator {

    private resistFingerprintingFirefox: boolean | null = null;
    private resistFingerprintingSuspectFrameCount = 0;
    private estimateStartTimestamp: number | null = null;
    private estimatedDeltaTime: number = 17;
    private estimateFrameCount: number = 0;
    private resyncWhenAfter: number = 0;
    private lastTimestamp: number | null = null;
    private readonly resyncTime = 10000;

    public getTimestamp(newFrame?: boolean) {
        let timestamp: number;
        if (this.resistFingerprintingFirefox) {
            timestamp = this.estimateAndRefreshFirefoxTimestamps(newFrame);
        } else {
            timestamp = this.getBrowserTime();
        }
        if (this.resistFingerprintingFirefox == null) {
            this.detectCompensateForResistFingerprint(timestamp, newFrame);
        }

        this.lastTimestamp = timestamp;

        return timestamp;
    }

    public getDeltaTime() {
        if (this.lastTimestamp == null) {
            this.getTimestamp();
            return 0;
        }

        let lastTimestamp = this.lastTimestamp;
        let timestamp = this.getTimestamp(true);

        if (timestamp == this.lastTimestamp &&
            this.resistFingerprintingFirefox) {
            return this.estimatedDeltaTime;
        }

        let returnValue = timestamp - lastTimestamp;

        return returnValue;
    }

    // This function uses some heuristics to attempt to
    // detect and workaround bad timestamps given by Firefox
    private detectCompensateForResistFingerprint(
        timestamp: number,
        newFrame?: boolean) {
        const minimumSuspectFrames = 5;

        if (this.estimateStartTimestamp == null) {
            this.estimateStartTimestamp = timestamp;
        }

        if (this.estimateStartTimestamp + 500 <= timestamp) {

            this.estimatedDeltaTime =
                (timestamp - this.estimateStartTimestamp) /
                this.estimateFrameCount;

            if (this.resistFingerprintingSuspectFrameCount >
                minimumSuspectFrames) {
                this.resistFingerprintingFirefox = true;
                this.estimateFrameCount = 0;
                this.resyncWhenAfter = timestamp + this.resyncTime;

            } else {
                this.resistFingerprintingFirefox = false;;
            }
        }

        if (this.lastTimestamp != null &&
            (timestamp - this.lastTimestamp === 0 ||
                timestamp - this.lastTimestamp === 100)) {
            this.resistFingerprintingSuspectFrameCount++;
        }

        if (newFrame) {
            this.estimateFrameCount++;
        }
    }

    private estimateAndRefreshFirefoxTimestamps(newFrame?: boolean) {
        let timestamp;
        if (newFrame) {
            if (this.lastTimestamp! <= this.resyncWhenAfter) {
                timestamp = this.lastTimestamp! + this.estimatedDeltaTime;
            } else {
                // Re-estimate frame times and resync timestamps to 
                // browser timestamps

                timestamp = this.getBrowserTime();
                if (timestamp < this.lastTimestamp!) {
                    this.lastTimestamp = timestamp;
                }
                this.estimatedDeltaTime =
                    (timestamp - this.estimateStartTimestamp!) /
                    this.estimateFrameCount;
                this.estimateFrameCount = 0;
                this.estimateStartTimestamp = timestamp;
                this.resyncWhenAfter = timestamp + this.resyncTime;
            }
        } else {
            timestamp = this.lastTimestamp!;
        }

        if (newFrame) {
            this.estimateFrameCount++;
        }
        return timestamp;
    }

    private getBrowserTime() {
        return window.performance != null &&
            window.performance.now != null ?
            window.performance.now() : new Date().getTime();
    }
}
