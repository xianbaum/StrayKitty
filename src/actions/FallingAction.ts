import { Action } from "./Action";
import { ActionType } from "./ActionType";
import { StrayKittyState } from "../StrayKittyState";
import { StandingAction } from "./StandingAction";

export class FallingAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (kitty.y < window.innerHeight - 32) {
            kitty.yVector += dt / 250;
        } else {
            if (Math.abs(kitty.yVector) < dt / 100) {
                kitty.y = window.innerHeight - 32;
                kitty.action = new StandingAction();
            }
            kitty.yVector *= -0.5;
        }
    }

    readonly type = ActionType.Falling;

    readonly frames = [2, 3];
}
