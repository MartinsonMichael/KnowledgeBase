import {NoteID, Note, construct_Note} from "../messages";
import axios from "../client"

export const LoadNote = 'LoadNote';
interface LoadNoteAction {
    type: typeof LoadNote
    payload: Note
}

export type NoteActionTypes = LoadNoteAction


export const loadNote = (noteID: NoteID) => {
    return async (dispatch: any) => {
        const response = await axios.get(`get_note/${noteID}`);

        dispatch({
            type: LoadNote,
            payload: construct_Note(response.data),
        });
    };
};

