import {construct_NoteHeadList, NoteHeadList} from "../messages";
import axios from "../client"
import {RootState} from "../index";
import {Action, ActionCreator} from "redux";
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from "redux"
import {SystemState} from "./system_reducer";

export const UpdateHeadList = 'UpdateHeadList';
interface UpdateHeadListAction {
    type: typeof UpdateHeadList
    payload: NoteHeadList
}

export type SystemActionTypes = UpdateHeadListAction


export const loadHeadList = () => {
    return async (dispatch: any) => {
        const response = await axios.get('note_list');

        dispatch({
            type: UpdateHeadList,
            payload: construct_NoteHeadList(response.data),
        });
    };
};
