import {
    NoteID,
    NoteTag,
    NoteHeadStore,
    construct_NoteHeadStore,
    construct_TagStore,
    TagStore, NoteHead, Note,
} from "../messages";
import axios from "../client"
import {updateNote, UpdateNote_SUCCESS} from "../note/note_actions";

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

export const UpdateTag = "UpdateTag";
interface UpdateTagAction {
    type: typeof UpdateTag
    payload: NoteTag
}

export const LoadHomePage = "LoadHomePage";
interface LoadHomePageAction {
    type: typeof LoadHomePage
    payload: string
}

export const UpdateHomePage = "UpdateHomePage";
interface UpdateHomePageAction {
    type: typeof UpdateHomePage
    payload: string
}

type HomePageActions = LoadHomePageAction | UpdateHomePageAction
type preLoadActions = StartLoadAction | UpdateNoteHeadStoreAction | UpdateTagStoreAction | ServerErrorAction
type tagActions =  UpdateTagAction
export type StructureActionTypes = preLoadActions | tagActions | HomePageActions


export const updateHomePage = (homePage: NoteID) => {
    return async (dispatch: any) => {
        dispatch({type: StartLoading});

        const response = await axios.get(`set_attribute/home_page/${homePage}`);

        if (response.status === 200) {
            dispatch({type: UpdateHomePage, payload: response.data['value']});
        } else {
            dispatch({type: ServerError, payload: response.data['msg']});
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
                type: UpdateNote_SUCCESS,
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
        const updatedTagObj = Object.assign({}, tagObj);
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

        dispatch({type: UpdateHomePage, payload: response.data['home_page']})
    };
};
