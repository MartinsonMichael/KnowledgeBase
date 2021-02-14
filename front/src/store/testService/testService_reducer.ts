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
        case "getTestList_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "getTestList_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "getTestList_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        case "getComplexByComplex_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "getComplexByComplex_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "getComplexByComplex_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        case "getBasicComplex_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "getBasicComplex_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "getBasicComplex_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        case "changeMisterPresident_START":
            return {
                ...state,
                isLoading: true,
                error: undefined,
            } as TestServiceState;

        case "changeMisterPresident_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: undefined,
            } as TestServiceState;

        case "changeMisterPresident_REJECTED":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            } as TestServiceState;


        default:
            return state
    }
}
