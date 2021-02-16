import { combineReducers } from 'redux';

import { systemReducer } from "./system/system_reducer";

import { StructureServiceReducer } from "./structureService/structureService_reducer"
import { NoteServiceReducer } from "./noteService/noteService_reducer"
import { TestServiceReducer } from "./testService/testService_reducer"


export const rootReducer = combineReducers({
    test: TestServiceReducer,

    systemState: systemReducer,
    note: NoteServiceReducer,
    structure: StructureServiceReducer,
});

export type RootState = ReturnType<typeof rootReducer>


