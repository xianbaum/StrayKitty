import { Action } from "./Action";
import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType"
import { LayingAction } from "./LayingAction";
import { LickingAction } from "./LickingAction";
import { WalkingAction } from "./WalkingAction";
import { ActionHelpers } from "./ActionHelpers";

export class YawningAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (ActionHelpers.checkIsFalling(kitty)) return;

        if (kitty.checkAndChangeState()) {
            kitty.action = Math.random() > 0.33 ? (
                Math.random() > 0.5 ? new WalkingAction() : new LickingAction())
                : new LayingAction()
        }
    }

    readonly type = ActionType.Yawning;

    readonly frames = [4];
}
