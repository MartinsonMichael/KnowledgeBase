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
// export function removeLastHistoryNote() {
//     return {type: popHistoryNote, payload: undefined}
// }

const needOpenNextNewNoteType = "needOpenNextNewNote";
interface openNextNewNoteAction {
    type: typeof needOpenNextNewNoteType,
    payload: undefined
}
export function needOpenNextNewNote() {
    return {type: needOpenNextNewNoteType, payload: undefined}
}

const openedNextNewNoteType = "openedNextNewNote";
interface openedNextNewNoteAction {
    type: typeof openedNextNewNoteType,
    payload: undefined
}
export function openedNextNewNote() {
    return {type: openedNextNewNoteType, payload: undefined}
}

export const onNewNote = "onNewNote";
interface onNewNoteAction {
    type: typeof onNewNote,
    payload: msg.NoteHead
}

export type SystemActionType = (
    needReloadAction |
    noNeedReloadAction |
    newHistoryNoteAction |
    popHistoryNoteAction |
    openNextNewNoteAction |
    openedNextNewNoteAction |
    onNewNoteAction
)