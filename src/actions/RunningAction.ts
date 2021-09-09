import { Action } from "./Action";
import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType"
import { Direction } from "../Direction";
import { ActionHelpers } from "./ActionHelpers";

export class RunningAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (ActionHelpers.checkIsFalling(kitty)) return;

        if (kitty.checkAndChangeState()) {
            kitty.action = ActionHelpers.randomAction();
        }
        kitty.xVector = kitty.dir == Direction.Right ? (dt / 8) : -(dt / 8);
    }

    readonly type = ActionType.Running;

    readonly frames = [3, 2];
}
