import { Direction } from "./Direction";
import { Action } from "./actions/Action";

export class StrayKittyState {
    intervalID: number;
    x: number;
    y: number;
    action: Action;
    type: number;
    animMax: number;
    frame: number;
    xVector: number;
    yVector: number;
    animTimer: number;
    dir: Direction;

    private get animTimerOverdue() {
        return this.animTimer > this.animMax;
    }

    static randomDir() {
        return Math.random() > 0.5 ? Direction.Left : Direction.Right;
    }

    checkAndChangeState() {
        if (this.animTimerOverdue) {
            this.animMax = Math.floor(Math.random() * 3000) + 1000;
            this.animTimer = 0;
            this.dir = StrayKittyState.randomDir();
        }
        return this.animTimerOverdue;
    }
}
