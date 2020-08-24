import {NoteID, Note, construct_Note} from "../messages";
import axios from "../client"

export const StartLoading = 'StartLoading';
interface StartLoadAction {
    type: typeof StartLoading
}

export const ServerError = 'ServerError';
interface ServerErrorAction {
    type: typeof ServerError
    payload: string
}

export const LoadNote = 'LoadNote';
interface LoadNoteAction {
    type: typeof LoadNote
    payload: Note
}

export const UpdateNoteMetaInfo = "UpdateNoteMetaInfo";
interface UpdateNoteMetaInfoAction {
    type: typeof UpdateNoteMetaInfo
    payload: Note
}

export const UpdateBody = "UpdateBody";
interface UpdateBodyAction {
    type: typeof UpdateBody
    payload: string
}

export const CreateNewNote = "CreateNewNote";
interface CreateNewNoteAction {
    type: typeof CreateNewNote
    payload: Note
}

export const UpdateTagDescription = "UpdateTagDescription";
interface UpdateTagDescriptionAction {
    type: typeof UpdateTagDescription
}

type NoteUpdateActions = UpdateBodyAction | UpdateNoteMetaInfoAction
type TagUpdateActions = UpdateTagDescriptionAction
export type NoteActionTypes = StartLoadAction | ServerErrorAction | LoadNoteAction | CreateNewNoteAction | NoteUpdateActions | TagUpdateActions


export const addTag = (note: Note, tagName: string) => {
    return async (dispatch: any) => {
        const response = await axios.get(`update_note/${note.id}/add_tag/${tagName}`,);

        if (response.status === 200) {
            dispatch({
                type: UpdateNoteMetaInfo,
                payload: {
                    ...note,
                    tags: [
                        ...note.tags,
                        tagName,
                    ]
                } as Note
            });
        } else {
            dispatch({
                type: ServerError,
                payload: response.data['msg'],
            });
        }
    }
};


export const delTag = (note: Note, tagName: string) => {
    return async (dispatch: any) => {
        const response = await axios.get(`update_note/${note.id}/del_tag/${tagName}`,);

        if (response.status === 200) {
            dispatch({
                type: UpdateNoteMetaInfo,
                payload: {
                    ...note,
                    tags: [...note.tags.filter((tag: string) => tag !== tagName)]
                } as Note
            });
        } else {
            dispatch({
                type: ServerError,
                payload: response.data['msg'],
            });
        }
    }
};


export const updateTagDescription = (tagName: string, newTagDescription: string) => {
    return async (dispatch: any) => {
        const response = await axios.get(`update_tag_description/${tagName}/${newTagDescription}`);

        if (response.status !== 200) {
            dispatch({
                type: ServerError,
                payload: response.data['msg'],
            });
        }
    }
};

export const createNewNote = (noteID: NoteID, name: string) => {
    return async (dispatch: any) => {
        dispatch({type: StartLoading});

        const response = await axios.get(`create_note/${noteID}/${name}`);

        if (response.status === 200) {
            dispatch({
                type: LoadNote,
                payload: construct_Note(response.data),
            });
        } else {
            dispatch({
                type: ServerError,
                payload: response.data['msg'],
            });
        }
    }
};


export const loadNote = (noteID: NoteID) => {
    return async (dispatch: any) => {

        dispatch({type:  StartLoading});

        const response = await axios.get(`get_note/${noteID}`);

        if (response.status === 200) {
            dispatch({
                type: LoadNote,
                payload: construct_Note(response.data),
            });
        } else {
            dispatch({
                type: ServerError,
                payload: response.data['msg'],
            });
        }
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
