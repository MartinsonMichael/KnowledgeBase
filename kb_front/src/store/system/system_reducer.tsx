import {SystemActionTypes} from "./system_actions";

import { NoteHeadList } from "../messages";

export interface SystemState {
    noteHeadList?: NoteHeadList
    tagList?: string[]

    isLoading: boolean
    error?: string
}

const initialState: SystemState = {
    noteHeadList: undefined,
    tagList: undefined,

    isLoading: false,
    error: undefined,
};

export function systemReducer(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {
        case "UpdateHeadList":
            return {
                ...state,
                noteHeadList: action.payload,
            };

        default:
            return state
    }
}