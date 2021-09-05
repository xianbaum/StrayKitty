import { Action } from "./Action";
import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType";
import { SittingAction } from "./SittingAction";
import { RunningAction } from "./RunningAction";
import { SleepingAction } from "./SleepingAction";
import { ActionHelpers } from "./ActionHelpers";

export class LayingAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (ActionHelpers.checkIsFalling(kitty)) return;

        if (kitty.checkAndChangeState()) {
            kitty.action =
                Math.random() > 0.33 ? (
                    Math.random() > 0.5 ? new RunningAction() : new SleepingAction()
                ) : new SittingAction();
        }
    }

    readonly type = ActionType.Laying;

    readonly frames = [7];
}


