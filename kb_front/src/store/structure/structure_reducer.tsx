import { NoteHeadStore, NoteID, TagStore } from "../messages";
import { StructureActionTypes } from "./structure_actions";

export interface StructureState {
    noteHeadStore?: NoteHeadStore
    tagStore?: TagStore
    homePage?: NoteID,

    isLoading: boolean
    error?: string
}

const initialState: StructureState = {
    noteHeadStore: undefined,
    tagStore: undefined,
    homePage: undefined,

    isLoading: false,
    error: undefined,
} as StructureState;

export function StructureReducer(state = initialState, action: StructureActionTypes): StructureState {
    switch (action.type) {
        case "StartLoading":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as StructureState;

        case "ServerError":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case "UpdateNoteHeadStore":
            return {
                ...state,
                noteHeadStore: action.payload,
            };

        case "UpdateTagStore":
            return {
                ...state,
                tagStore: action.payload,
            };

        case "UpdateTag":
            if (state.tagStore === undefined) {
                return {
                    ...state,
                    isLoading: false,
                    error: "Cant update Tag, no TagStore",
                }
            }
            const newTagStore = state.tagStore;
            newTagStore[action.payload.name] = action.payload;
            return {
                ...state,
                tagStore: newTagStore
            };

        case "UpdateHomePage":
            return {
                ...state,
                isLoading: false,
                error: undefined,
                homePage: action.payload,
            } as StructureState;

        default:
            return state
    }
}