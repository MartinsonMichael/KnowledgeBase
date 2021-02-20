import * as msg from "../generated_messages"
import {SystemActionType} from "./system_actions";


export interface SystemState {
    needReloading: boolean
    noteBrowserHistory: string[]
}

const initialState: SystemState = {
    needReloading: false,
    noteBrowserHistory: [],
} as SystemState;


export function SystemReducer(state = initialState, action: SystemActionType): SystemState {
    switch (action.type) {
        case "needReload":
            return {
                ...state,
                needReloading: true,
            } as SystemState;

        case "noNeedReload":
             return {
                 ...state,
                 needReloading: false,
             } as SystemState;

        case "newHistoryNote":
            return {
                ...state,
                noteBrowserHistory: [
                    ...state.noteBrowserHistory,
                    action.payload,
                ],
            } as SystemState;

        case "popHistoryNote":
            state.noteBrowserHistory.pop();
            return {
                ...state,
                noteBrowserHistory: state.noteBrowserHistory,
            } as SystemState;

        default:
            return state
    }
}
