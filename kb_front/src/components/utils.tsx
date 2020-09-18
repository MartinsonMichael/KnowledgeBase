import {Note, NoteHead, NoteHeadStore, NoteID, NoteTag, TagStore} from "../store/messages";

export function headStoreToList(noteHeadStore: NoteHeadStore | undefined): NoteHead[] {
    if (noteHeadStore === undefined) {
        return [] as NoteHead[]
    }
    return [...Object.keys(noteHeadStore).map(key => noteHeadStore[key])]
}

export function tagStoreToList(tagStore: TagStore | undefined): NoteTag[] {
    if (tagStore === undefined) {
        return [] as NoteTag[]
    }
    return [...Object.keys(tagStore).map(key => tagStore[key])]
}

export function getNoteIDByName(name: string, noteHeadStore: NoteHeadStore | undefined) : NoteID | undefined {
    if (noteHeadStore === undefined) {
        return undefined;
    }
    const possibleObject = Object.keys(noteHeadStore).filter(noteID => noteHeadStore[noteID].name === name)
    if (possibleObject.length !== 1) {
        return undefined;
    }
    return possibleObject[0]
}

export function getNoteNameByID(noteID: NoteID, noteHeadStore: NoteHeadStore | undefined) : string | undefined {
    if (noteHeadStore === undefined) {
        return undefined;
    }
    if (!Object.keys(noteHeadStore).includes(noteID)) {
        return undefined;
    }
    const possibleObject = noteHeadStore[noteID];
    return possibleObject.name
}

export function createMDLinkToNote(noteID: NoteID, noteName: string): string {
    let nameToShow = noteName;
    if (nameToShow.length > 35) {
        nameToShow = nameToShow.substring(0, 32) + "..."
    }
    return `[@${nameToShow}](/note/${noteID.toString()})`
}

export function createMDLinkToTag(tagName: string): string {
    return `[#${tagName}](/tag/${tagName})`
}

export function insertStringIntoString(src: string, insert: string, position: number): string {
    if (position < 0 || position > src.length) {
        return src
    }
    if (position <= 0) {
        return insert + src
    }
    if (position >= src.length) {
        return src + insert
    }
    console.log("position : ", position);
    console.log("src len : ", src.length);
    console.log("part one : ", src.substring(0, position));
    console.log("part tow : ", src.substring(position));
    return src.substring(0, position) + insert + src.substring(position)
}

export function filterNoteList(noteList: NoteHead[] | Note[] | undefined, filterString: string): NoteHead[] {
    if (noteList === undefined) {
        return [] as NoteHead[]
    }
    const LCFilterStr = filterString.toLowerCase();
    return noteList.filter((noteHead: NoteHead) => (
        noteHead.name.toLowerCase().includes(LCFilterStr) ||
        noteHead.id.toLowerCase().includes(LCFilterStr) ||
        noteHead.links.filter(
            (link: string) => link !== undefined && link !== null && link.toLowerCase().includes(LCFilterStr)
        ).length !== 0 ||
        noteHead.tags.filter(
            (tagName: string) => tagName !== undefined && tagName !== null && tagName.toLowerCase().includes(LCFilterStr)
        ).length !== 0
    ))
}