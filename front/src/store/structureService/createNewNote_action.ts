// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

import axios from "../client"
import * as msg from "../generated_messages"
import {Note} from "../generated_messages";
import {addNoteLink_SUCCESS} from "../noteService/noteService_actions";
import {NoteUpdateResponse} from "../generated_messages";
import {onNewNote} from "../system/system_actions";

export const createNewNote_START = "createNewNote_START";
export interface createNewNote_START_Action {
    type: typeof createNewNote_START
    payload: undefined
}
export const createNewNote_SUCCESS = "createNewNote_SUCCESS";
export interface createNewNote_SUCCESS_Action {
    type: typeof createNewNote_SUCCESS
    payload: msg.NewNoteResponse
}
export const createNewNote_REJECTED = "createNewNote_REJECTED";
export interface createNewNote_REJECTED_Action {
    type: typeof createNewNote_REJECTED
    payload: string
}

export const createNewNote = (name: string, note: Note | undefined) => {
    return async (dispatch: any) => {
        dispatch({type: createNewNote_START, payload: undefined});

        const response = await axios.post(
            'createNewNote',
            {
                'name': name,
                'link_from': (note !== undefined ? note.note_id : ""),
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            const newNoteResponse = msg.construct_NewNoteResponse(response.data);
            dispatch({type: createNewNote_SUCCESS, payload: newNoteResponse});
            dispatch({type: onNewNote, payload: newNoteResponse.new_note});
            if (note !== undefined) {
                dispatch({
                    type: addNoteLink_SUCCESS,
                    payload: {
                        msg: "Link added",
                        updatedNote: {
                            ...note,
                            links: [
                                ...note.links,
                                newNoteResponse.new_note,
                            ],
                        } as Note,
                    } as NoteUpdateResponse,
                });
            }
        } else {
            dispatch({type: createNewNote_REJECTED, payload: response.data});
        }
    }
};


