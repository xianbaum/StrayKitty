import { Action } from "./Action";
import { ActionType } from "./ActionType";
import { StrayKittyState } from "../StrayKittyState";
import { StandingAction } from "./StandingAction";
import { ActionHelpers } from "./ActionHelpers";

export class GrabbedAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
    }

    readonly type = ActionType.Grabbed;

    readonly frames = [1, 2, 3];
}
