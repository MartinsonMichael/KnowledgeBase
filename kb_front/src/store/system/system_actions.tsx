import axios from "../client"
import {construct_NoteTag, NoteHead, NoteHeadStore, NoteTag} from "../messages";
import {construct_NoteHeadStore} from "../messages";


export const UpdateHeadList = 'UpdateHeadList';
interface UpdateHeadListAction {
    type: typeof UpdateHeadList
    payload: NoteHeadStore
}

export const UpdateTagList = 'UpdateTagList';
interface UpdateTagListAction {
    type: typeof UpdateTagList
    payload: NoteTag[]
}

export const CreateNewNote = 'CreateNewNote';
interface CreateNewNoteAction {
    type: typeof CreateNewNote
    payload: NoteHead
}

export const ServerApiError = 'ServerApiError';
interface ServerApiErrorAction {
    type: typeof ServerApiError
    payload: string
}

export type SystemActionTypes = ServerApiErrorAction| UpdateHeadListAction | UpdateTagListAction | CreateNewNoteAction


export const loadHeadList = () => {
    return async (dispatch: any) => {
        const response = await axios.get('get_structure');

        dispatch({
            type: UpdateHeadList,
            payload: construct_NoteHeadStore(response.data['note_head']),
        });

        dispatch({
           type: UpdateTagList,
           payload: [...response.data['tag_list'].map((x: any) => construct_NoteTag(x))]
        });
    };
};

export const createNewNote = (noteID: string) => {
  return async (dispatch: any) => {
        const response = await axios.get(`create_note/${noteID}`);

        if (response.status === 200) {
            dispatch({
                type: CreateNewNote,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ServerApiError,
                payload: response.data,
            });
        }
    };
};