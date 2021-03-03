// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

import axios from "../client"
import * as msg from "../generated_messages"

import { createNewNote_START_Action, createNewNote_SUCCESS_Action, createNewNote_REJECTED_Action } from "./createNewNote_action"


export const getNote_START = "getNote_START";
interface getNote_START_Action {
    type: typeof getNote_START
    payload: undefined
}
export const getNote_SUCCESS = "getNote_SUCCESS";
interface getNote_SUCCESS_Action {
    type: typeof getNote_SUCCESS
    payload: msg.Note
}
export const getNote_REJECTED = "getNote_REJECTED";
interface getNote_REJECTED_Action {
    type: typeof getNote_REJECTED
    payload: string
}

export const getNote = (note_id: string) => {
    return async (dispatch: any) => {
        dispatch({type: getNote_START, payload: undefined});

        const response = await axios.post(
            'getNote',
            {
                'note_id': note_id,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: getNote_SUCCESS, payload: msg.construct_Note(response.data)});
        } else {
            dispatch({type: getNote_REJECTED, payload: response.data});
        }
    }
};


export const addNoteTag_START = "addNoteTag_START";
interface addNoteTag_START_Action {
    type: typeof addNoteTag_START
    payload: undefined
}
export const addNoteTag_SUCCESS = "addNoteTag_SUCCESS";
interface addNoteTag_SUCCESS_Action {
    type: typeof addNoteTag_SUCCESS
    payload: msg.NoteUpdateResponse
}
export const addNoteTag_REJECTED = "addNoteTag_REJECTED";
interface addNoteTag_REJECTED_Action {
    type: typeof addNoteTag_REJECTED
    payload: string
}

export const addNoteTag = (note_id: string, tag_id: string) => {
    return async (dispatch: any) => {
        dispatch({type: addNoteTag_START, payload: undefined});

        const response = await axios.post(
            'addNoteTag',
            {
                'note_id': note_id,
                'tag_id': tag_id,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: addNoteTag_SUCCESS, payload: msg.construct_NoteUpdateResponse(response.data)});
        } else {
            dispatch({type: addNoteTag_REJECTED, payload: response.data});
        }
    }
};


export const delNoteTag_START = "delNoteTag_START";
interface delNoteTag_START_Action {
    type: typeof delNoteTag_START
    payload: undefined
}
export const delNoteTag_SUCCESS = "delNoteTag_SUCCESS";
interface delNoteTag_SUCCESS_Action {
    type: typeof delNoteTag_SUCCESS
    payload: msg.NoteUpdateResponse
}
export const delNoteTag_REJECTED = "delNoteTag_REJECTED";
interface delNoteTag_REJECTED_Action {
    type: typeof delNoteTag_REJECTED
    payload: string
}

export const delNoteTag = (note_id: string, tag_id: string) => {
    return async (dispatch: any) => {
        dispatch({type: delNoteTag_START, payload: undefined});

        const response = await axios.post(
            'delNoteTag',
            {
                'note_id': note_id,
                'tag_id': tag_id,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: delNoteTag_SUCCESS, payload: msg.construct_NoteUpdateResponse(response.data)});
        } else {
            dispatch({type: delNoteTag_REJECTED, payload: response.data});
        }
    }
};


export const addNoteLink_START = "addNoteLink_START";
interface addNoteLink_START_Action {
    type: typeof addNoteLink_START
    payload: undefined
}
export const addNoteLink_SUCCESS = "addNoteLink_SUCCESS";
interface addNoteLink_SUCCESS_Action {
    type: typeof addNoteLink_SUCCESS
    payload: msg.NoteUpdateResponse
}
export const addNoteLink_REJECTED = "addNoteLink_REJECTED";
interface addNoteLink_REJECTED_Action {
    type: typeof addNoteLink_REJECTED
    payload: string
}

export const addNoteLink = (note_id: string, link_note_id: string) => {
    return async (dispatch: any) => {
        dispatch({type: addNoteLink_START, payload: undefined});

        const response = await axios.post(
            'addNoteLink',
            {
                'note_id': note_id,
                'link_note_id': link_note_id,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: addNoteLink_SUCCESS, payload: msg.construct_NoteUpdateResponse(response.data)});
        } else {
            dispatch({type: addNoteLink_REJECTED, payload: response.data});
        }
    }
};


export const delNoteLink_START = "delNoteLink_START";
interface delNoteLink_START_Action {
    type: typeof delNoteLink_START
    payload: undefined
}
export const delNoteLink_SUCCESS = "delNoteLink_SUCCESS";
interface delNoteLink_SUCCESS_Action {
    type: typeof delNoteLink_SUCCESS
    payload: msg.NoteUpdateResponse
}
export const delNoteLink_REJECTED = "delNoteLink_REJECTED";
interface delNoteLink_REJECTED_Action {
    type: typeof delNoteLink_REJECTED
    payload: string
}

export const delNoteLink = (note_id: string, link_note_id: string) => {
    return async (dispatch: any) => {
        dispatch({type: delNoteLink_START, payload: undefined});

        const response = await axios.post(
            'delNoteLink',
            {
                'note_id': note_id,
                'link_note_id': link_note_id,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: delNoteLink_SUCCESS, payload: msg.construct_NoteUpdateResponse(response.data)});
        } else {
            dispatch({type: delNoteLink_REJECTED, payload: response.data});
        }
    }
};


export const updateNoteName_START = "updateNoteName_START";
interface updateNoteName_START_Action {
    type: typeof updateNoteName_START
    payload: undefined
}
export const updateNoteName_SUCCESS = "updateNoteName_SUCCESS";
interface updateNoteName_SUCCESS_Action {
    type: typeof updateNoteName_SUCCESS
    payload: msg.NoteUpdateResponse
}
export const updateNoteName_REJECTED = "updateNoteName_REJECTED";
interface updateNoteName_REJECTED_Action {
    type: typeof updateNoteName_REJECTED
    payload: string
}

export const updateNoteName = (note_id: string, new_name: string) => {
    return async (dispatch: any) => {
        dispatch({type: updateNoteName_START, payload: undefined});

        const response = await axios.post(
            'updateNoteName',
            {
                'note_id': note_id,
                'new_name': new_name,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: updateNoteName_SUCCESS, payload: msg.construct_NoteUpdateResponse(response.data)});
        } else {
            dispatch({type: updateNoteName_REJECTED, payload: response.data});
        }
    }
};


export const updateNoteBody_START = "updateNoteBody_START";
interface updateNoteBody_START_Action {
    type: typeof updateNoteBody_START
    payload: undefined
}
export const updateNoteBody_SUCCESS = "updateNoteBody_SUCCESS";
interface updateNoteBody_SUCCESS_Action {
    type: typeof updateNoteBody_SUCCESS
    payload: msg.NoteUpdateResponse
}
export const updateNoteBody_REJECTED = "updateNoteBody_REJECTED";
interface updateNoteBody_REJECTED_Action {
    type: typeof updateNoteBody_REJECTED
    payload: string
}

export const updateNoteBody = (note_id: string, new_body: string) => {
    return async (dispatch: any) => {
        dispatch({type: updateNoteBody_START, payload: undefined});

        const response = await axios.post(
            'updateNoteBody',
            {
                'note_id': note_id,
                'new_body': new_body,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: updateNoteBody_SUCCESS, payload: msg.construct_NoteUpdateResponse(response.data)});
        } else {
            dispatch({type: updateNoteBody_REJECTED, payload: response.data});
        }
    }
};



export type NoteServiceActionType = (
    getNote_START_Action |
    getNote_SUCCESS_Action |
    getNote_REJECTED_Action |
    createNewNote_START_Action |
    createNewNote_SUCCESS_Action |
    createNewNote_REJECTED_Action |
    addNoteTag_START_Action |
    addNoteTag_SUCCESS_Action |
    addNoteTag_REJECTED_Action |
    delNoteTag_START_Action |
    delNoteTag_SUCCESS_Action |
    delNoteTag_REJECTED_Action |
    addNoteLink_START_Action |
    addNoteLink_SUCCESS_Action |
    addNoteLink_REJECTED_Action |
    delNoteLink_START_Action |
    delNoteLink_SUCCESS_Action |
    delNoteLink_REJECTED_Action |
    updateNoteName_START_Action |
    updateNoteName_SUCCESS_Action |
    updateNoteName_REJECTED_Action |
    updateNoteBody_START_Action |
    updateNoteBody_SUCCESS_Action |
    updateNoteBody_REJECTED_Action 
)