import {NoteID, Note, construct_Note} from "../messages";
import axios from "../client"

export const StartLoading = 'StartLoading';
interface StartLoadAction {
    type: typeof StartLoading
}

export const LoadNote = 'LoadNote';
interface LoadNoteAction {
    type: typeof LoadNote
    payload: Note
}

export const UpdateBody = "UpdateBody";
interface UpdateBodyAction {
    type: typeof UpdateBody,
    payload: string,
}

export type NoteActionTypes = StartLoadAction | LoadNoteAction | UpdateBodyAction


export const loadNote = (noteID: NoteID) => {
    return async (dispatch: any) => {

        dispatch({type:  StartLoading});

        const response = await axios.get(`get_note/${noteID}`);

        dispatch({
            type: LoadNote,
            payload: construct_Note(response.data),
        });
    };
};

export const updateBody = (noteID: NoteID, newBody: string, updateLocally: boolean = false) => {
    return async (dispatch: any) => {

        // dispatch({type:  StartLoading});

        const response = await axios.post(
            `update_note/${noteID}/body`,
            newBody,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            }
        );

        if (updateLocally) {
            dispatch({
                type: UpdateBody,
                payload: newBody,
            });
        }
    };
};
