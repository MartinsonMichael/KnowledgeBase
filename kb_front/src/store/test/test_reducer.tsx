import {TestActionType} from "./test_actions";

export interface TestState {
    testValue: number
    ayncTestValue: number

    loading: boolean
    error?: string
}

const initialState: TestState = {
    testValue: 100,
    ayncTestValue: 30,

    loading: false,
    error: undefined
};

export function TestReducer(state = initialState, action: TestActionType): TestState {
    switch (action.type) {
        case "TestStoreValue":
            return {
                ...state,
                testValue: action.payload,
            };

        // case "TestAsyncValue":


        default:
            return state
    }
}