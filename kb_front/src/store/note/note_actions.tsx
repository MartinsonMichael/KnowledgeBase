import {NoteID, Note} from "../messages";


export const LoadNote = 'LoadNote';
interface LoadNoteAction {
    type: typeof LoadNote
    payload: Note
}

export const TestStoreValue = 'TestStoreValue';
interface TestValueAction {
    type: typeof TestStoreValue
    payload: number
}

export type NoteActionTypes = LoadNoteAction | TestValueAction


// export function loadNote(id: NoteID): NoteActionTypes {
//     return {
//         type: LoadNote,
//         payload: "",
//     }
// }

export function changeTestValue(newValue: number): NoteActionTypes {
    return {
        type: TestStoreValue,
        payload: newValue,
    }
}
