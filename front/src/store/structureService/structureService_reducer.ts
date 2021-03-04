import * as msg from "../generated_messages"
import { StructureServiceActionType } from "./structureService_actions"


export interface StructureServiceState {
    noteHeadStore?: msg.NoteHeadStore,
    tagStore?: msg.TagStore,

    notesWithoutLinks: msg.NoteHead[]

    isLoading: boolean
    error?: string
}

const initialState: StructureServiceState = {
    noteHeadStore: undefined,
    tagStore: undefined,

    notesWithoutLinks: [],

    isLoading: false,
    error: undefined,
} as StructureServiceState;


export function StructureServiceReducer(
    state = initialState,
    action: StructureServiceActionType,
): StructureServiceState {
    switch (action.type) {

        case "getStructure_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as StructureServiceState;

        case "getStructure_SUCCESS":
            return {
                ...state,
                noteHeadStore: action.payload.head_store,
                tagStore: action.payload.tag_store,
                isLoading: false,
                error: undefined,
            } as StructureServiceState;

        case "getStructure_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as StructureServiceState;


        case "createNewTag_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as StructureServiceState;

        case "createNewTag_SUCCESS":
            return {
                ...state,
                tagStore: action.payload,
                isLoading: false,
                error: undefined,
            } as StructureServiceState;

        case "createNewTag_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as StructureServiceState;


        case "createNewNote_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as StructureServiceState;

        case "createNewNote_SUCCESS":
            return {
                ...state,
                noteHeadStore: action.payload.head_store,
                isLoading: false,
                error: undefined,
            } as StructureServiceState;

        case "createNewNote_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as StructureServiceState;


        case "updateTag_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as StructureServiceState;

        case "updateTag_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as StructureServiceState;

        case "updateTag_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as StructureServiceState;


        case "getNotesWithoutLinks_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as StructureServiceState;

        case "getNotesWithoutLinks_SUCCESS":
            return {
                ...state,
                notesWithoutLinks: action.payload.list,
                isLoading: false,
                error: undefined,
            } as StructureServiceState;

        case "getNotesWithoutLinks_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as StructureServiceState;


        default:
            return state
    }
}
