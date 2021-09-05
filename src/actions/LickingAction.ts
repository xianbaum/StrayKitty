import { Action } from "./Action";
import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType"
import { LayingAction } from "./LayingAction";
import { SleepingAction } from "./SleepingAction";
import { SittingAction } from "./SittingAction";
import { ActionHelpers } from "./ActionHelpers";

export class LickingAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (ActionHelpers.checkIsFalling(kitty)) return;

        if (kitty.checkAndChangeState()) {
            Math.random() > 0.33 ? (
                Math.random() > 0.5 ? new LayingAction() : new SleepingAction())
                : new SittingAction()
        }
    }

    type = ActionType.Licking;

    frames = [9, 10];
}
