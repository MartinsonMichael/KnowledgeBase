export type NoteID = string

export interface Note {
    id: NoteID
    name: string
    tags: string[]
    links: string[]
    body: string
}

export interface NoteHead {
    id: NoteID
    name: string
}

export interface NoteHeadList {
    list: NoteHead[]
}
