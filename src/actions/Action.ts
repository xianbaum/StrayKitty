import { StrayKittyState } from "../StrayKittyState";
import { ActionType } from "./ActionType";

export interface Action {
    do(kitty: StrayKittyState, dt: number): void;
    readonly type: ActionType;
    readonly frames: number[]
}
