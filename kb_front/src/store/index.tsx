import { combineReducers } from 'redux';

import { NoteReducer } from "./note/note_reducer";
import { systemReducer } from "./system/system_reducer";


export const rootReducer = combineReducers({
    systemState: systemReducer,
    note: NoteReducer
});

export type RootState = ReturnType<typeof rootReducer>


