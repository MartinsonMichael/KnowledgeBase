import { SystemActionTypes } from "./system_actions";
import { LinkSearchMode } from "../../components/LinkDialogSearch";

export interface SystemState {
    linkSearchState: LinkSearchMode,
    isNewTagCreatorOpen: boolean,
}

const initialState: SystemState = {
    isNewTagCreatorOpen: false,
    linkSearchState: "close",
};

export function systemReducer(state = initialState, action: SystemActionTypes): SystemState {
    switch (action.type) {

        case "ChangeLinkSearchDialogType":
            return {
                ...state,
                linkSearchState: action.payload,
            };

        case "OpenNewTagCreator":
            return {
                ...state,
                isNewTagCreatorOpen: true,
            };

        case "CloseNewTagCreator":
            return {
                ...state,
                isNewTagCreatorOpen: false,
            };

        default:
            return state
    }
}