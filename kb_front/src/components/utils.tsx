import {NoteHead, NoteHeadStore} from "../store/messages";

export function headStoreToList(noteHeadStore: NoteHeadStore | undefined): NoteHead[] {
    if (noteHeadStore === undefined) {
        return [] as NoteHead[]
    }
    return [...Object.keys(noteHeadStore).map(key => noteHeadStore[key])]
}