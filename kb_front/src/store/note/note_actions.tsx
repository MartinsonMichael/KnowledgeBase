import {
    NoteID,
    Note,
    construct_Note,
    NoteTag,
    NoteHeadStore,
    construct_NoteHeadStore,
    construct_TagStore,
    TagStore,
} from "../messages";
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

export const UpdateNoteHeadStore = 'UpdateNoteHeadStore';
interface UpdateNoteHeadStoreAction {
    type: typeof UpdateNoteHeadStore
    payload: NoteHeadStore
}

export const UpdateTagStore = "UpdateTagStore";
interface UpdateTagStoreAction {
    type: typeof UpdateTagStore
    payload: TagStore
}

export const LoadNote = 'LoadNote';
interface LoadNoteAction {
    type: typeof LoadNote
    payload: Note
}

export const UpdateNote = "UpdateNote";
interface UpdateNoteAction {
    type: typeof UpdateNote
    payload: Note
}

export const UpdateNoteBody = "UpdateNoteBody";
interface UpdateBodyAction {
    type: typeof UpdateNoteBody
    payload: string
}

export const CreateNewNote = "CreateNewNote";
interface CreateNewNoteAction {
    type: typeof CreateNewNote
    payload: Note
}

export const UpdateTag = "UpdateTag";
interface UpdateTagAction {
    type: typeof UpdateTag
    payload: NoteTag
}

type preLoadActions = StartLoadAction | UpdateNoteHeadStoreAction | UpdateTagStoreAction | ServerErrorAction
type tagActions =  UpdateTagAction
type NoteUpdateActions = UpdateBodyAction | UpdateNoteAction
export type NoteActionTypes = preLoadActions | LoadNoteAction | CreateNewNoteAction | NoteUpdateActions | tagActions


export const updateNote = (
    note: Note,
    newName?: string, newBody?: string,
    addTagName?: string, delTagName?: string,
    addLinkID?: string, delLinkID?: string,
    ) => {
    return async (dispatch: any) => {
        const newNoteObj: Note = note;

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
            dispatch({
                type: UpdateNote,
                payload: newNoteObj,
            });
        } else {
            dispatch({
                type: ServerError,
                payload: response.data['msg'],
            });
        }
    }
};

export const createTag = (tagObj: NoteTag, addToNote?: Note) => {
    return async (dispatch: any) => {
        const response = await axios.post(
            `create_tag/${tagObj.name}`,
            JSON.stringify(tagObj),
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            }
        );

        if (response.status === 200) {
            dispatch({type: UpdateTag, payload: tagObj});
        } else {
            dispatch({type: ServerError, payload: response.data['msg']});
        }

        if (response.status === 200 && addToNote !== undefined) {
            await updateNote(addToNote, undefined, undefined, tagObj.name)(dispatch);
            dispatch({
                type: UpdateNote,
                payload: {
                    ...addToNote,
                    tags: [
                        ...addToNote.tags,
                        tagObj.name,
                    ],
                }
            });
        }
    }
};

export const updateTag = (tagObj: NoteTag, tagDescription?: string, tagColor?: string) => {
    return async (dispatch: any) => {
        const updatedTagObj = tagObj;
        if (tagDescription !== undefined) {
            updatedTagObj.description = tagDescription;
        }
        if (tagColor !== undefined) {
            updatedTagObj.color = tagColor;
        }

        const response = await axios.post(
            `update_tag/${updatedTagObj.name}`,
            JSON.stringify(updatedTagObj),
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            }
        );

        if (response.status === 200) {
            dispatch({type: UpdateTag, payload: updatedTagObj});
        } else {
            dispatch({type: ServerError, payload: response.data['msg']});
        }
    }
};

export const createNewNote = (noteID: NoteID, name: string) => {
    return async (dispatch: any) => {
        dispatch({type: StartLoading});

        const response = await axios.get(`create_note/${noteID}/${name}`);

        if (response.status === 200) {
            dispatch({type: LoadNote, payload: construct_Note(response.data)});
        } else {
            dispatch({type: ServerError, payload: response.data['msg']});
        }
    }
};


export const loadNote = (noteID: NoteID) => {
    return async (dispatch: any) => {

        dispatch({type:  StartLoading});

        const response = await axios.get(`get_note/${noteID}`);

        if (response.status === 200) {
            dispatch({type: LoadNote, payload: construct_Note(response.data)});
        } else {
            dispatch({type: ServerError, payload: response.data['msg']});
        }
    };
};

export const loadStructure = () => {
    return async (dispatch: any) => {
        const response = await axios.get('get_structure');

        dispatch({
            type: UpdateNoteHeadStore,
            payload: construct_NoteHeadStore(response.data['note_head']),
        });

        dispatch({
           type: UpdateTagStore,
           payload: construct_TagStore(response.data['tag_list']),
        });
    };
};
