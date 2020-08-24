import {NoteHead, NoteHeadStore} from "../store/messages";

export function headStoreToList(noteHeadStore: NoteHeadStore): NoteHead[] {
    return [...Object.keys(noteHeadStore).map(key => noteHeadStore[key])]
}