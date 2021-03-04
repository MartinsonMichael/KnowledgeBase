import { Note, NoteHead, NoteHeadStore, Tag, TagHead, TagStore } from "../store/generated_messages";

export function headStoreToList(noteHeadStore: NoteHeadStore | undefined): NoteHead[] {
    if (noteHeadStore === undefined) {
        return [] as NoteHead[]
    }
    return [...Object.keys(noteHeadStore.heads).map(key => noteHeadStore.heads[key])]
}

export function tagStoreToList(tagStore: TagStore | undefined): TagHead[] {
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
        noteHead.tags.filter(
            (tag: TagHead) => tag.name.toLowerCase().includes(LCFilterStr) || tag.color.toLowerCase().includes(LCFilterStr)
        ).length !== 0
    ))
}

export function makeID(length: number): string {
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

export function shuffleArray<T>(array: T[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// export function tagIDListToObjectList(tagIDList: string[], tagStore: TagStore | undefined): Tag[] {
//     if (tagStore === undefined) {
//         return [] as Tag[]
//     }
//     return [
//         ...tagIDList.map((tagID: string) => tagStore.tags[tagID])
//     ]
// }