// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

import axios from "../client"
import * as msg from "../generated_messages"


export const getStructure_START = "getStructure_START";
interface getStructure_START_Action {
    type: typeof getStructure_START
    payload: undefined
}
export const getStructure_SUCCESS = "getStructure_SUCCESS";
interface getStructure_SUCCESS_Action {
    type: typeof getStructure_SUCCESS
    payload: msg.Structure
}
export const getStructure_REJECTED = "getStructure_REJECTED";
interface getStructure_REJECTED_Action {
    type: typeof getStructure_REJECTED
    payload: string
}

export const getStructure = () => {
    return async (dispatch: any) => {
        dispatch({type: getStructure_START, payload: undefined});

        const response = await axios.get('getStructure');

        if (response.status === 200) {
            dispatch({type: getStructure_SUCCESS, payload: msg.construct_Structure(response.data)});
        } else {
            dispatch({type: getStructure_REJECTED, payload: response.data});
        }
    }
};


export const getNotesHeaderList_START = "getNotesHeaderList_START";
interface getNotesHeaderList_START_Action {
    type: typeof getNotesHeaderList_START
    payload: undefined
}
export const getNotesHeaderList_SUCCESS = "getNotesHeaderList_SUCCESS";
interface getNotesHeaderList_SUCCESS_Action {
    type: typeof getNotesHeaderList_SUCCESS
    payload: msg.NoteHeaderList
}
export const getNotesHeaderList_REJECTED = "getNotesHeaderList_REJECTED";
interface getNotesHeaderList_REJECTED_Action {
    type: typeof getNotesHeaderList_REJECTED
    payload: string
}

export const getNotesHeaderList = () => {
    return async (dispatch: any) => {
        dispatch({type: getNotesHeaderList_START, payload: undefined});

        const response = await axios.get('getNotesHeaderList');

        if (response.status === 200) {
            dispatch({type: getNotesHeaderList_SUCCESS, payload: msg.construct_NoteHeaderList(response.data)});
        } else {
            dispatch({type: getNotesHeaderList_REJECTED, payload: response.data});
        }
    }
};


export const getNotes_START = "getNotes_START";
interface getNotes_START_Action {
    type: typeof getNotes_START
    payload: undefined
}
export const getNotes_SUCCESS = "getNotes_SUCCESS";
interface getNotes_SUCCESS_Action {
    type: typeof getNotes_SUCCESS
    payload: msg.Note
}
export const getNotes_REJECTED = "getNotes_REJECTED";
interface getNotes_REJECTED_Action {
    type: typeof getNotes_REJECTED
    payload: string
}

export const getNotes = (id: string) => {
    return async (dispatch: any) => {
        dispatch({type: getNotes_START, payload: undefined});

        const response = await axios.post(
            'getNotes',
            {
                'id': id,
            },
        );

        if (response.status === 200) {
            dispatch({type: getNotes_SUCCESS, payload: msg.construct_Note(response.data)});
        } else {
            dispatch({type: getNotes_REJECTED, payload: response.data});
        }
    }
};



export type NoteServiceActionType = (
    getStructure_START_Action |
    getStructure_SUCCESS_Action |
    getStructure_REJECTED_Action |
    getNotesHeaderList_START_Action |
    getNotesHeaderList_SUCCESS_Action |
    getNotesHeaderList_REJECTED_Action |
    getNotes_START_Action |
    getNotes_SUCCESS_Action |
    getNotes_REJECTED_Action 
)