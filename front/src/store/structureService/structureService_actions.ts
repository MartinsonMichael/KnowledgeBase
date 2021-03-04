// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

import axios from "../client"
import * as msg from "../generated_messages"

import { createNewTag_START_Action, createNewTag_SUCCESS_Action, createNewTag_REJECTED_Action } from "./createNewTag_action"
import { createNewNote_START_Action, createNewNote_SUCCESS_Action, createNewNote_REJECTED_Action } from "./createNewNote_action"


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

        const response = await axios.get(
            'getStructure',
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: getStructure_SUCCESS, payload: msg.construct_Structure(response.data)});
        } else {
            dispatch({type: getStructure_REJECTED, payload: response.data});
        }
    }
};


export const getNotesWithoutLinks_START = "getNotesWithoutLinks_START";
interface getNotesWithoutLinks_START_Action {
    type: typeof getNotesWithoutLinks_START
    payload: undefined
}
export const getNotesWithoutLinks_SUCCESS = "getNotesWithoutLinks_SUCCESS";
interface getNotesWithoutLinks_SUCCESS_Action {
    type: typeof getNotesWithoutLinks_SUCCESS
    payload: msg.NoteHeadList
}
export const getNotesWithoutLinks_REJECTED = "getNotesWithoutLinks_REJECTED";
interface getNotesWithoutLinks_REJECTED_Action {
    type: typeof getNotesWithoutLinks_REJECTED
    payload: string
}

export const getNotesWithoutLinks = () => {
    return async (dispatch: any) => {
        dispatch({type: getNotesWithoutLinks_START, payload: undefined});

        const response = await axios.get(
            'getNotesWithoutLinks',
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: getNotesWithoutLinks_SUCCESS, payload: msg.construct_NoteHeadList(response.data)});
        } else {
            dispatch({type: getNotesWithoutLinks_REJECTED, payload: response.data});
        }
    }
};


export const updateTag_START = "updateTag_START";
interface updateTag_START_Action {
    type: typeof updateTag_START
    payload: undefined
}
export const updateTag_SUCCESS = "updateTag_SUCCESS";
interface updateTag_SUCCESS_Action {
    type: typeof updateTag_SUCCESS
    payload: msg.Tag
}
export const updateTag_REJECTED = "updateTag_REJECTED";
interface updateTag_REJECTED_Action {
    type: typeof updateTag_REJECTED
    payload: string
}

export const updateTag = (tag_id: string, name: string, description: string, color: string) => {
    return async (dispatch: any) => {
        dispatch({type: updateTag_START, payload: undefined});

        const response = await axios.post(
            'updateTag',
            {
                'tag_id': tag_id,
                'name': name,
                'description': description,
                'color': color,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: updateTag_SUCCESS, payload: msg.construct_Tag(response.data)});
        } else {
            dispatch({type: updateTag_REJECTED, payload: response.data});
        }
    }
};



export type StructureServiceActionType = (
    getStructure_START_Action |
    getStructure_SUCCESS_Action |
    getStructure_REJECTED_Action |
    getNotesWithoutLinks_START_Action |
    getNotesWithoutLinks_SUCCESS_Action |
    getNotesWithoutLinks_REJECTED_Action |
    createNewTag_START_Action |
    createNewTag_SUCCESS_Action |
    createNewTag_REJECTED_Action |
    createNewNote_START_Action |
    createNewNote_SUCCESS_Action |
    createNewNote_REJECTED_Action |
    updateTag_START_Action |
    updateTag_SUCCESS_Action |
    updateTag_REJECTED_Action 
)