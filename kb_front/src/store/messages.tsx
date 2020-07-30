// potentially this can be generated

import {keys} from "@material-ui/core/styles/createBreakpoints";

export type NoteID = string

export interface Note {
    id: NoteID
    name: string
    tags: string[]
    links: string[]
    body: string
}
export function construct_Note(x: any): Note {
    return {
        'id': x['id'] as NoteID,
        'name': x['name'],
        'tags': x['tags'],
        'links': x['links'],
        'body': x['body'],
    } as Note
}

export interface NoteTag {
    name: string
    color: string
}
export function construct_NoteTag(x: any): NoteTag {
    return {
        'name': x['name'],
        'color': x['color'],
    } as NoteTag
}

export interface NoteHead {
    id: NoteID
    name: string
    tags: string[]
    links: string[]
}
export function construct_NoteHead(x: any): NoteHead {
    return {
        id: x['id'] as NoteID,
        name: x['name'],
        tags: x['tags'],
        links: x['links'],
    } as NoteHead
}

export interface NoteHeadStore {
    [key: string]: NoteHead
}
export function construct_NoteHeadStore(x: any): NoteHeadStore {
    const headList: NoteHead[] = [
    ...x.map((noteObj: any) => {
            return {
                id: noteObj['id'],
                name: noteObj['name'],
                tags: noteObj['tags'],
                links: noteObj['links'],
            } as NoteHead
        })
    ];
    const headStore: NoteHeadStore = {};
    headList.forEach(noteHead => {
       headStore[noteHead.id] = noteHead
    });
    return headStore
}
