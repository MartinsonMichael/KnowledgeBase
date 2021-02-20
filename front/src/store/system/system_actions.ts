import * as msg from "../generated_messages"

const needReload = "needReload";
interface needReloadAction {
    type: typeof needReload,
    payload: undefined
}
export function setNeedReload() {
    return {type: needReload, payload: undefined}
}


const noNeedReload = "noNeedReload";
interface noNeedReloadAction {
    type: typeof noNeedReload,
    payload: undefined
}
export function unsetNeedReload() {
    return {type: noNeedReload, payload: undefined}
}


const newHistoryNote = "newHistoryNote";
interface newHistoryNoteAction {
    type: typeof newHistoryNote,
    payload: string
}
export function addBrowserHistoryNote(note_id: string) {
    return {type: newHistoryNote, payload: note_id}
}

const popHistoryNote = "popHistoryNote";
interface popHistoryNoteAction {
    type: typeof popHistoryNote,
    payload: undefined
}
export function removeLastHistoryNote() {
    return {type: popHistoryNote, payload: undefined}
}

export type SystemActionType = (
    needReloadAction |
    noNeedReloadAction |
    newHistoryNoteAction |
    popHistoryNoteAction
)