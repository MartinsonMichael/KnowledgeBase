// potentially this can be generated

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

export interface NoteHead {
    id: NoteID
    name: string
}
export function construct_NoteHead(x: any): NoteHead {
    return {
        'id': x['id'],
        'name': x['name'],
    } as NoteHead
}

export interface NoteHeadList {
    list: NoteHead[]
}
export function construct_NoteHeadList(data: any): NoteHeadList {
    return {
        list: [
            ...data['list'].map((x: any) => construct_NoteHead(x))
        ]
    } as NoteHeadList
}
