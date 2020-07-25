import {Note} from "../messages";
import {NoteActionTypes} from "./note_actions";

export interface NoteState {
    note?: Note
    testValue: number
}

const initialState: NoteState = {
    testValue: 100
};

export function NoteReducer(state = initialState, action: NoteActionTypes): NoteState {
    switch (action.type) {
        case "LoadNote":
            return {
                ...state,
                note: action.payload,
            };
        case "TestStoreValue":
            return {
                ...state,
                testValue: action.payload,
            };
        default:
            return state
    }
}