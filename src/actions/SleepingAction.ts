import { Action } from "./Action";
import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType";
import { SittingAction } from "./SittingAction";
import { StandingAction } from "./StandingAction";
import { ActionHelpers } from "./ActionHelpers";

export class SleepingAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (ActionHelpers.checkIsFalling(kitty)) return;

        if (kitty.checkAndChangeState()) {
            kitty.action =
                Math.random() > 0.4 ?
                    new SittingAction()
                    : new StandingAction()
        }
    }

    readonly type = ActionType.Sleeping;

    readonly frames = [5, 6];
}


