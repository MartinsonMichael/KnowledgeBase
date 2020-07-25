import {SystemState} from "./system_state";
import {SystemActionTypes} from "./system_actions";

const initialState: SystemState = {
    tagList: [],
    isLoading: false,
};

export function systemReducer(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {
        case "LoadHeadList":
            return {
                noteHeadList: action.payload,
                ...state,
            };

        default:
            return state
    }
}