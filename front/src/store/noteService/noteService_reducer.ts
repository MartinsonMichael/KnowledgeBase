import * as msg from "../generated_messages"
import { NoteServiceActionType } from "./noteService_actions"


export interface NoteServiceState {
    note?: msg.Note,

    isLoading: boolean
    error?: string
}

const initialState: NoteServiceState = {
    note: undefined,

    isLoading: false,
    error: undefined,
} as NoteServiceState;


export function NoteServiceReducer(state = initialState, action: NoteServiceActionType): NoteServiceState {
    switch (action.type) {
        case "getNote_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "getNote_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "getNote_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        case "addNoteTag_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "addNoteTag_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "addNoteTag_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        case "delNoteTag_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "delNoteTag_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "delNoteTag_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        case "addNoteLink_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "addNoteLink_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "addNoteLink_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        case "delNoteLink_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "delNoteLink_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "delNoteLink_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        case "updateNoteName_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "updateNoteName_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "updateNoteName_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        case "updateNoteBody_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "updateNoteBody_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as NoteServiceState;

        case "updateNoteBody_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as NoteServiceState;


        default:
            return state
    }
}
