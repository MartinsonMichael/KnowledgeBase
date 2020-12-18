import { Note, NoteID } from "../messages";
import { NoteActionTypes } from "./note_actions";

export interface NoteState {
    note?: Note,
    newNoteID?: NoteID,
    error?: string,

    isLoading_NoteLoad: boolean,
    isLoading_NoteUpdate: boolean,
    isLoading_NoteCreate: boolean,
}

const initialState: NoteState = {
    note: undefined,
    newNoteID: undefined,
    error: undefined,

    isLoading_NoteLoad: false,
    isLoading_NoteUpdate: false,
    isLoading_NoteCreate: false,

} as NoteState;

export function NoteReducer(state: NoteState = initialState, action: NoteActionTypes): NoteState {
    switch (action.type) {
        // note loading actions
        case "LoadNote_START":
            return {
                ...state,
                isLoading_NoteLoad: true,
                error: undefined,
            } as NoteState;
        case "LoadNote_REJECTED":
            return {
                ...state,
                isLoading_NoteLoad: false,
                error: action.payload,
            };
        case "LoadNote_SUCCESS":
            return {
                ...state,
                isLoading_NoteLoad: false,
                note: action.payload,
            };

        // note update actions
        case "UpdateNote_START":
            return {
                ...state,
                isLoading_NoteUpdate: true,
                error: undefined,
            } as NoteState;
        case "UpdateNote_REJECTED":
            return {
                ...state,
                isLoading_NoteUpdate: false,
                error: action.payload,
            };
        case "UpdateNote_SUCCESS":
            return {
                ...state,
                isLoading_NoteUpdate: false,
                note: action.payload,
            };

        // create new note actions
        case "CreateNote_START":
            return {
                ...state,
                isLoading_NoteCreate: true,
                error: undefined,
            } as NoteState;
        case "CreateNote_REJECTED":
            return {
                ...state,
                isLoading_NoteCreate: false,
                error: action.payload,
            };
        case "CreateNote_SUCCESS":
            return {
                ...state,
                isLoading_NoteCreate: false,
                newNoteID: action.payload.id,
            };

        default:
            return state
    }
}