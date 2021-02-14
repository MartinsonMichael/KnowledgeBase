import { combineReducers } from 'redux';

import { NoteReducer } from "./note/note_reducer";
import { systemReducer } from "./system/system_reducer";
import { StructureReducer } from "./structure/structure_reducer";

import { TestServiceReducer } from "./testService/testService_reducer"


export const rootReducer = combineReducers({
    test: TestServiceReducer,

    systemState: systemReducer,
    note: NoteReducer,
    structure: StructureReducer,
});

export type RootState = ReturnType<typeof rootReducer>


