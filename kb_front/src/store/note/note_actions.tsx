import {
    NoteID,
    Note,
    construct_Note,
    NoteTag,
    NoteHeadStore,
    construct_NoteHeadStore,
    construct_TagStore,
    TagStore, NoteHead,
} from "../messages";
import axios from "../client"

// Load note from server (3 actions)
export const LoadNote_START = 'LoadNote_START';
interface LoadNote_START_Action {
    type: typeof LoadNote_START
    payload: undefined
}

export const LoadNote_SUCCESS = 'LoadNote_SUCCESS';
interface LoadNote_SUCCESS_Action {
    type: typeof LoadNote_SUCCESS
    payload: Note
}

export const LoadNote_REJECTED = 'LoadNote_REJECTED';
interface LoadNote_REJECTED_Action {
    type: typeof LoadNote_REJECTED
    payload: string
}

// update Note (3 actions)
export const UpdateNote_START = "UpdateNote_START";
interface UpdateNote_START_Action {
    type: typeof UpdateNote_START
    payload: undefined
}

export const UpdateNote_SUCCESS = "UpdateNote_SUCCESS";
interface UpdateNote_SUCCESS_Action {
    type: typeof UpdateNote_SUCCESS
    payload: Note
}

export const UpdateNote_REJECTED = "UpdateNote_REJECTED";
interface UpdateNote_REJECTED_Action {
    type: typeof UpdateNote_REJECTED
    payload: string
}

// create new note (3 actions)
export const CreateNote_START = "CreateNote_START";
interface CreateNote_START_Action {
    type: typeof CreateNote_START
    payload: undefined
}

export const CreateNote_SUCCESS = "CreateNote_SUCCESS";
interface CreateNote_SUCCESS_Action {
    type: typeof CreateNote_SUCCESS
    payload: Note
}

export const CreateNote_REJECTED = "CreateNote_REJECTED";
interface CreateNote_REJECTED_Action {
    type: typeof CreateNote_REJECTED
    payload: string
}

// final action types
type LoadAction = LoadNote_START_Action | LoadNote_SUCCESS_Action | LoadNote_REJECTED_Action
type UpdateAction = UpdateNote_START_Action | UpdateNote_SUCCESS_Action | UpdateNote_REJECTED_Action
type CreateAction = CreateNote_START_Action | CreateNote_SUCCESS_Action | CreateNote_REJECTED_Action
export type NoteActionTypes = LoadAction | UpdateAction | CreateAction


export const updateNote = (
    note: Note | undefined,
    newName?: string, newBody?: string,
    addTagName?: string, delTagName?: string,
    addLinkID?: string, delLinkID?: string,
    ) => {
    return async (dispatch: any) => {

        if (note === undefined) {
            return;
        }

        dispatch({type: UpdateNote_START, payload: undefined});

        const newNoteObj: Note = Object.assign({}, note);

        if (newName !== undefined) {
            newNoteObj.name = newName
        }
        if (newBody !== undefined) {
            newNoteObj.body = newBody
        }
        if (addTagName !== undefined) {
            newNoteObj.tags = [...newNoteObj.tags, addTagName]
        }
        if (delTagName !== undefined) {
            newNoteObj.tags = newNoteObj.tags.filter(tagName => tagName !== delTagName)
        }
        if (addLinkID !== undefined) {
            newNoteObj.links = [...newNoteObj.links, addLinkID]
        }
        if (delLinkID !== undefined) {
            newNoteObj.links = newNoteObj.links.filter(linkID => linkID !== delLinkID)
        }

        const response = await axios.post(
            `update_note/${note.id}/full`,
            JSON.stringify(newNoteObj),
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            }
        );

        if (response.status === 200) {
            dispatch({type: UpdateNote_SUCCESS, payload: newNoteObj });
        } else {
            dispatch({type: UpdateNote_REJECTED, payload: response.data['msg']});
        }
    }
};


export const createNewNote = (noteID: NoteID, name: string) => {
    return async (dispatch: any) => {
        dispatch({type: CreateNote_START, payload: undefined});

        const response = await axios.get(`create_note/${noteID}/${name}`);

        if (response.status === 200) {
            dispatch({type: CreateNote_SUCCESS, payload: construct_Note(response.data)});
        } else {
            dispatch({type: CreateNote_REJECTED, payload: response.data['msg']});
        }
    }
};


export const loadNote = (noteID: NoteID) => {
    return async (dispatch: any) => {

        dispatch({type:  LoadNote_START, payload: undefined});

        const response = await axios.get(`get_note/${noteID}`);

        if (response.status === 200) {
            dispatch({type: LoadNote_SUCCESS, payload: construct_Note(response.data)});
        } else {
            dispatch({type: LoadNote_REJECTED, payload: response.data['msg']});
        }
    };
};