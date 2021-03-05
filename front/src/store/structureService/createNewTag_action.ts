// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

import axios from "../client"
import * as msg from "../generated_messages"
import { addNoteTag_SUCCESS } from "../noteService/noteService_actions";
import { Note , NoteUpdateResponse } from "../generated_messages";

export const createNewTag_START = "createNewTag_START";
export interface createNewTag_START_Action {
    type: typeof createNewTag_START
    payload: undefined
}
export const createNewTag_SUCCESS = "createNewTag_SUCCESS";
export interface createNewTag_SUCCESS_Action {
    type: typeof createNewTag_SUCCESS
    payload: msg.TagStore
}
export const createNewTag_REJECTED = "createNewTag_REJECTED";
export interface createNewTag_REJECTED_Action {
    type: typeof createNewTag_REJECTED
    payload: string
}

export const createNewTag = (name: string, add_to_note_id: string,  note: Note | undefined) => {
    return async (dispatch: any) => {
        dispatch({type: createNewTag_START, payload: undefined});

        const response = await axios.post(
            'createNewTag',
            {
                'name': name,
                'add_to_note_id': add_to_note_id,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            const newTagStore = msg.construct_TagStore(response.data);
            dispatch({type: createNewTag_SUCCESS, payload: newTagStore});
            if (note !== undefined) {
                dispatch({
                    type: addNoteTag_SUCCESS,
                    payload: {
                        msg: "Tag added",
                        updatedNote: {
                            ...note,
                            tags: [
                                ...note.tags,
                                ...Object.keys(newTagStore.tags).filter(
                                    (tag_id: string) => newTagStore.tags[tag_id].name === name
                                ).map(
                                    (tag_id: string) => newTagStore.tags[tag_id]
                                ),
                            ],
                        } as Note,
                    } as NoteUpdateResponse,
                })
            }
        } else {
            dispatch({type: createNewTag_REJECTED, payload: response.data});
        }
    }
};


