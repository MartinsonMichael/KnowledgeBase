import { combineReducers } from 'redux';

import { StructureServiceReducer } from "./structureService/structureService_reducer"
import { NoteServiceReducer } from "./noteService/noteService_reducer"
import { TestServiceReducer } from "./testService/testService_reducer"
import { SystemReducer } from "./system/system_reducer";


export const rootReducer = combineReducers({
    test: TestServiceReducer,

    system: SystemReducer,
    note: NoteServiceReducer,
    structure: StructureServiceReducer,
});

export type RootState = ReturnType<typeof rootReducer>


