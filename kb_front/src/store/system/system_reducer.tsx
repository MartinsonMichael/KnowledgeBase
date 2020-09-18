import { SystemActionTypes } from "./system_actions";
import { LinkSearchMode } from "../../components/LinkDialogSearch";
import {NoteID} from "../messages";

export interface SystemState {
    linkSearchState: LinkSearchMode,
    isNewTagCreatorOpen: boolean,
    showNewPageCreator: boolean
}

const initialState: SystemState = {
    isNewTagCreatorOpen: false,
    linkSearchState: "close",
    showNewPageCreator: false,
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

        case "ToggleNewNoteCreator":
            return {
                ...state,
                showNewPageCreator: !state.showNewPageCreator,
            };

        default:
            return state
    }
}