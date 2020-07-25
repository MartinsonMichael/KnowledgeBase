import {NoteHeadList} from "../messages";

export const LoadHeadList = 'LoadHeadList';
interface LoadHeadListAction {
    type: typeof LoadHeadList
    payload: NoteHeadList
}

export type SystemActionTypes = LoadHeadListAction

export function loadHeadList(): SystemActionTypes {
    // axios
    //     .get()
    //     .then()
    return {
        type: LoadHeadList,
        payload: {list: []} as NoteHeadList
    }
}