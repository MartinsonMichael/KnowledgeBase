import { ThunkAction } from 'redux-thunk'

import {RootState} from "../index";
import {Action} from "redux";


export const TestStoreValue = 'TestStoreValue';
interface TestValueAction {
    type: typeof TestStoreValue
    payload: number
}

export const TestAsyncValue = 'TestAsyncValue';
interface TestAsyncValueAction {
    type: typeof TestAsyncValue
    payload: number
}

export type TestActionType = TestValueAction | TestAsyncValueAction


export function changeTestValue(newValue: number): TestActionType {
    return {
        type: TestStoreValue,
        payload: newValue,
    }
}

export function asyncChangeTestValue() {

}

// export const thunkSendMessage = (message: string): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
//   const asyncResp = await axios
//   dispatch(
//     sendMessage({
//       message,
//       user: asyncResp,
//       timestamp: new Date().getTime()
//     })
//   )
// }