import axios from "../client"
import {construct_NoteTag, NoteHead, NoteHeadStore, NoteTag} from "../messages";
import {construct_NoteHeadStore} from "../messages";


export const UpdateHeadList = 'UpdateHeadList';
interface UpdateHeadListAction {
    type: typeof UpdateHeadList
    payload: NoteHeadStore
}

export const ServerApiError = 'ServerApiError';
interface ServerApiErrorAction {
    type: typeof ServerApiError
    payload: string
}

export const UpdateTagList = 'UpdateTagList';
interface UpdateTagListAction {
    type: typeof UpdateTagList
    payload: NoteTag[]
}

export type SystemActionTypes = ServerApiErrorAction| UpdateHeadListAction | UpdateTagListAction


export const loadHeadList = () => {
    return async (dispatch: any) => {
        const response = await axios.get('get_structure');

        dispatch({
            type: UpdateHeadList,
            payload: construct_NoteHeadStore(response.data['note_head']),
        });


        console.log(response.data['tag_list'])

        dispatch({
           type: UpdateTagList,
           payload: [...response.data['tag_list'].map((x: any) => construct_NoteTag(x))]
        });
    };
};
