import { Action } from "./Action";
import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType";
import { StandingAction } from "./StandingAction";
import { YawningAction } from "./YawningAction";

export class SittingAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (kitty.checkAndChangeState()) {
            kitty.action =
                Math.random() > 0.4 ? new YawningAction()
                    : new StandingAction();
        }
    }

    readonly type = ActionType.Sitting;

    readonly frames = [8];
}


