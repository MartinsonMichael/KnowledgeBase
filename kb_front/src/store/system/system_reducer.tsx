import {SystemActionTypes} from "./system_actions";

import {NoteHeadStore} from "../messages";

export interface SystemState {
    noteHeadStore?: NoteHeadStore
    tagList?: string[]

    isLoading: boolean
    error?: string
}

const initialState: SystemState = {
    noteHeadStore: undefined,
    tagList: undefined,

    isLoading: false,
    error: undefined,
};

export function systemReducer(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {
        case "UpdateHeadList":
            return {
                ...state,
                noteHeadStore: action.payload,
            };

        default:
            return state
    }
}