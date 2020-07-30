import axios from "../client"
import {NoteHeadStore} from "../messages";
import {construct_NoteHeadStore} from "../messages";


export const UpdateHeadList = 'UpdateHeadList';
interface UpdateHeadListAction {
    type: typeof UpdateHeadList
    payload: NoteHeadStore
}

export type SystemActionTypes = UpdateHeadListAction


export const loadHeadList = () => {
    return async (dispatch: any) => {
        const response = await axios.get('get_structure');

        dispatch({
            type: UpdateHeadList,
            payload: construct_NoteHeadStore(response.data['note_head']),
        });
    };
};
