import { Action } from "./Action";
import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType"
import { ActionHelpers } from "./ActionHelpers";

export class StandingAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (ActionHelpers.checkIsFalling(kitty)) return;

        if (kitty.checkAndChangeState()) {
            kitty.action = ActionHelpers.randomAction();
        }
    }

    readonly type = ActionType.Standing;

    readonly frames = [0];
}
