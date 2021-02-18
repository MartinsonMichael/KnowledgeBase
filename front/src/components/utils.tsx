import { Note, NoteHead, NoteHeadStore, Tag, TagStore } from "../store/generated_messages";

export function headStoreToList(noteHeadStore: NoteHeadStore | undefined): NoteHead[] {
    if (noteHeadStore === undefined) {
        return [] as NoteHead[]
    }
    return [...Object.keys(noteHeadStore.heads).map(key => noteHeadStore.heads[key])]
}

export function tagStoreToList(tagStore: TagStore | undefined): Tag[] {
    if (tagStore === undefined) {
        return [] as Tag[]
    }
    return [...Object.keys(tagStore.tags).map(key => tagStore.tags[key])]
}


export function createMDLinkToNote(noteID: string, noteName: string): string {
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