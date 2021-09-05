import { FallingAction } from "./FallingAction";
import { StrayKittyState } from "../StrayKittyState";
import { StandingAction } from "./StandingAction";
import { WalkingAction } from "./WalkingAction";
import { RunningAction } from "./RunningAction";
import { YawningAction } from "./YawningAction";
import { SleepingAction } from "./SleepingAction";
import { LayingAction } from "./LayingAction";
import { LickingAction } from "./LickingAction";
import { SittingAction } from "./SittingAction";

export class ActionHelpers {
    static checkIsFalling(state: StrayKittyState) {
        if (state.y < window.innerHeight - 32) {
            state.action = new FallingAction;
            return true;
        }
        return false;
    }

    static randomAction() {
        let randomNumber = Math.floor(Math.random() * 8);
        switch (randomNumber) {
            case 0: return new StandingAction();
            case 1: return new WalkingAction();
            case 2: return new RunningAction();
            case 3: return new YawningAction();
            case 4: return new SleepingAction();
            case 5: return new LayingAction();
            case 6: return new SittingAction();
            case 7: return new LickingAction();
            default: return new StandingAction();
        }
    }


}
