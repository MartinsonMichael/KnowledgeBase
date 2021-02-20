import * as msg from "../generated_messages"
import { NoteServiceActionType, updateNoteBody } from "./noteService_actions"
import { noteServiceInplaceActionType } from "./noteService_inplace_actions";


export interface NoteServiceState {
    note?: msg.Note
    body?: string
    changeNum: number
    needUpdate: boolean

    isLoading: boolean
    error?: string
    msg?: string
}

const initialState: NoteServiceState = {
    note: undefined,
    body: undefined,
    changeNum: 0,
    needUpdate: false,

    isLoading: false,
    error: undefined,
    msg: undefined
} as NoteServiceState;


export function NoteServiceReducer(
    state = initialState,
    action: NoteServiceActionType | noteServiceInplaceActionType
): NoteServiceState {
    switch (action.type) {

        case "RemoveMsg":
            return {
                ...state,
                msg: undefined,
            } as NoteServiceState;
        case "updateLocalBody":
            console.log("HERE");
            console.log(action.payload);
            return {
                ...state,
                body: action.payload,
                needUpdate: state.changeNum > 30,
                changeNum: state.changeNum + 1,
            } as NoteServiceState;
        case "needBodyUpdate":
            return {
                ...state,
                needUpdate: true,
            } as NoteServiceState;
        case "noUpdateNeeded":
            return {
                ...state,
                needUpdate: false,
            } as NoteServiceState;



        case "getNote_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as NoteServiceState;

        case "getNote_SUCCESS":
            return {
                ...state,
                note: action.payload,
                body: action.payload.body,
                changeNum: 0,
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
                note: action.payload.updatedNote,
                msg: action.payload.msg,
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
                note: action.payload.updatedNote,
                msg: action.payload.msg,
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
                note: action.payload.updatedNote,
                msg: action.payload.msg,
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
                note: action.payload.updatedNote,
                msg: action.payload.msg,
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
                note: action.payload.updatedNote,
                msg: action.payload.msg,
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
                changeNum: 0,
                msg: action.payload.msg,
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
