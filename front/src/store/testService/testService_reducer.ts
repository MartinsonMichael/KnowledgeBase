import * as msg from "../generated_messages"
import { TestServiceActionType } from "./testService_actions"


export interface TestServiceState {
    // TODO add valuable state, probably rename

    isLoading: boolean
    error?: string
}

const initialState: TestServiceState = {
    // TODO add valuable state, probably rename

    isLoading: false,
    error: undefined,
} as TestServiceState;


export function TestServiceReducer(state = initialState, action: TestServiceActionType): TestServiceState {
    switch (action.type) {
        case "getSimpleMsg_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "getSimpleMsg_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "getSimpleMsg_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        case "getComplexMsg_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "getComplexMsg_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "getComplexMsg_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        case "getComplexBySimple_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "getComplexBySimple_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "getComplexBySimple_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        case "postComplex_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "postComplex_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "postComplex_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        case "postNull_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "postNull_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "postNull_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        default:
            return state
    }
}
