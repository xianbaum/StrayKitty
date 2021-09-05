import { Action } from "./Action";
import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType"
import { Direction } from "../Direction";
import { ActionHelpers } from "./ActionHelpers";

export class WalkingAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (ActionHelpers.checkIsFalling(kitty)) return;

        if (kitty.checkAndChangeState()) {
            kitty.action = ActionHelpers.randomAction();
        }
        kitty.xVector = kitty.dir == Direction.Right ? 1 : -1;
    }

    readonly type = ActionType.Walking;

    readonly frames = [0, 1];
}
