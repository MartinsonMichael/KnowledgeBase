import * as msg from "../generated_messages"
import { SystemActionType } from "./system_actions";


export interface SystemState {
    needReloading: boolean
    noteBrowserHistory: string[]

    needOpenNewNote: boolean
    newNote?: msg.NoteHead
}

const initialState: SystemState = {
    needReloading: false,
    noteBrowserHistory: [],

    needOpenNewNote: false,
    newNote: undefined,
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

        case "needOpenNextNewNote":
            return {
                ...state,
                needOpenNewNote: true,
            } as SystemState;

        case "openedNextNewNote":
            return {
                ...state,
                needOpenNewNote: false,
                newNote: undefined,
            } as SystemState;

        case "onNewNote":
            return {
                ...state,
                newNote: action.payload,
            } as SystemState;

        default:
            return state
    }
}
