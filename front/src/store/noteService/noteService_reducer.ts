import * as msg from "../generated_messages"
import { NoteServiceActionType } from "./noteService_actions"


export interface NoteServiceState {
    // TODO add valuable state, probably rename

    isLoading: boolean
    error?: string
}

const initialState: NoteServiceState = {
    // TODO add valuable state, probably rename

    isLoading: false,
    error: undefined,
} as NoteServiceState;


export function NoteServiceReducer(state = initialState, action: NoteServiceActionType): NoteServiceState {
    switch (action.type) {
        case "getStructure_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "getStructure_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "getStructure_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        case "getNotesHeaderList_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "getNotesHeaderList_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "getNotesHeaderList_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        case "getNotes_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "getNotes_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "getNotes_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        default:
            return state
    }
}
