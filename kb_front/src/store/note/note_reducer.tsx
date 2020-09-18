import {Note, NoteHeadStore, NoteID, TagStore} from "../messages";
import { NoteActionTypes } from "./note_actions";

export interface NoteState {
    note?: Note
    noteHeadStore?: NoteHeadStore
    tagStore?: TagStore
    homePage?: NoteID,
    createdNote?: NoteID,

    isLoading: boolean
    error?: string
}

const initialState: NoteState = {
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

        case "LoadNote":
            return {
                ...state,
                isLoading: false,
                error: undefined,
                note: action.payload,
            };

        case "UpdateNoteBody":
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

        case "UpdateNote":
            if (state.noteHeadStore === undefined) {
                return {
                    ...state,
                    isLoading: false,
                    error: "Cant update list of all notes, cause it undefined"
                }
            }
            const newNoteHeadStore = state.noteHeadStore;
            newNoteHeadStore[action.payload.id] = action.payload;
            return {
                ...state,
                isLoading: false,
                note: action.payload,
                noteHeadStore: newNoteHeadStore,
            };

        case "RemoveNewNoteRecord":
            return {
                ...state,
                createdNote: undefined,
            };

        case "NewNote":
            if (state.noteHeadStore === undefined) {
                return {
                    ...state,
                    isLoading: false,
                    error: "Cant update list of all notes, cause it undefined"
                }
            }
            const newNoteHeadStore2 = state.noteHeadStore;
            newNoteHeadStore2[action.payload.id] = action.payload;
            return {
                ...state,
                isLoading: false,
                error: undefined,
                createdNote: action.payload.id,
                noteHeadStore: newNoteHeadStore2,
            };

        case "UpdateHomePage":
            return {
                ...state,
                isLoading: false,
                error: undefined,
                homePage: action.payload,
            };
        default:
            return state
    }
}