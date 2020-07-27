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
            };
        case "LoadNote":
            return {
                ...state,
                isLoading: false,
                note: action.payload,
            };

        case "UpdateBody":
            if (state.note === undefined) {
                return {
                    ...state,
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
        default:
            return state
    }
}