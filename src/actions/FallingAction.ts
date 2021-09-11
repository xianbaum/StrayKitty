import { Action } from "./Action";
import { ActionType } from "./ActionType";
import { StrayKittyState } from "../StrayKittyState";
import { StandingAction } from "./StandingAction";
import { StrayKitty } from "../StrayKitty";

export class FallingAction implements Action {
    do(kitty: StrayKittyState, dt: number) {
        if (kitty.y <
            window.innerHeight -
            Math.ceil(StrayKitty.CanvasHeight * kitty.scale)) {
            kitty.yVector += dt / 250;
        } else {
            kitty.y = window.innerHeight -
                Math.ceil(StrayKitty.CanvasHeight * kitty.scale);
            if (Math.abs(kitty.yVector) < dt / 10) {
                kitty.action = new StandingAction();
                kitty.yVector = 0;
            } else {
                kitty.y--;
                kitty.yVector *= -0.5;
            }
        }
    }

    readonly type = ActionType.Falling;

    readonly frames = [2, 3];
}
