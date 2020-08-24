import {Note} from "../messages";
import {NoteActionTypes} from "./note_actions";

export interface NoteState {
    note?: Note

    isLoading: boolean
    error?: string
}

const initialState: NoteState = {
    note: undefined,

    isLoading: false,
    error: undefined,
};

export function NoteReducer(state = initialState, action: NoteActionTypes): NoteState {
    switch (action.type) {
        case "StartLoading":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };

        case "ServerError":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case "LoadNote":
            return {
                ...state,
                isLoading: false,
                error: undefined,
                note: action.payload,
            };

        case "CreateNewNote":
            return {
                ...state,
                isLoading: false,
                error: undefined,
                note: action.payload,
            };

        case "UpdateBody":
            if (state.note === undefined) {
                return {
                    ...state,
                    isLoading: false,
                    error: "Can't update Note body, current Note object is undefined."
                }
            }
            return {
                ...state,
                isLoading: false,
                note: {
                    ...state.note,
                    body: action.payload,
                }
            };

        case "UpdateNoteMetaInfo":
            return {
                ...state,
                isLoading: false,
                note: action.payload,
            };
        default:
            return state
    }
}