// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

export interface TagHead {
    tag_id: string
    name: string
    color: string
}
export function construct_TagHead(x: any): TagHead {
    return x as TagHead
}


export interface NoteHead {
    note_id: string
    name: string
    tags: TagHead[]
}
export function construct_NoteHead(x: any): NoteHead {
    return {
        ...x,
        'tags': [
            ...x['tags'].map((item: any) => construct_TagHead(item))
        ],
    } as NoteHead
}


export interface NoteHeadStore {
    heads: {[key: string]: NoteHead}
}
export function construct_NoteHeadStore(x: any): NoteHeadStore {
    let obj = {
        'heads': {} as {[key: string]: NoteHead},
    };
    Object.keys(x['heads']).forEach(
        (obj_key: string) => obj.heads[obj_key] = construct_NoteHead(x['heads'][obj_key])
    );
    return obj as NoteHeadStore;}


export interface TagStore {
    tags: {[key: string]: TagHead}
}
export function construct_TagStore(x: any): TagStore {
    let obj = {
        'tags': {} as {[key: string]: TagHead},
    };
    Object.keys(x['tags']).forEach(
        (obj_key: string) => obj.tags[obj_key] = construct_TagHead(x['tags'][obj_key])
    );
    return obj as TagStore;}


export interface Structure {
    head_store: NoteHeadStore
    tag_store: TagStore
}
export function construct_Structure(x: any): Structure {
    return {
        'head_store': construct_NoteHeadStore(x['head_store']),
        'tag_store': construct_TagStore(x['tag_store']),
    } as Structure
}


export interface TagCreateRequest {
    name: string
    add_to_note_id: string
}
export function construct_TagCreateRequest(x: any): TagCreateRequest {
    return x as TagCreateRequest
}


export interface Tag {
    tag_id: string
    name: string
    description: string
    color: string
}
export function construct_Tag(x: any): Tag {
    return x as Tag
}


export interface Note {
    note_id: string
    name: string
    tags: TagHead[]
    links: NoteHead[]
    body: string
}
export function construct_Note(x: any): Note {
    return {
        ...x,
        'tags': [
            ...x['tags'].map((item: any) => construct_TagHead(item))
        ],
        'links': [
            ...x['links'].map((item: any) => construct_NoteHead(item))
        ],
    } as Note
}


export interface NoteRequest {
    note_id: string
}
export function construct_NoteRequest(x: any): NoteRequest {
    return x as NoteRequest
}


export interface NoteTagUpdate {
    note_id: string
    tag_id: string
}
export function construct_NoteTagUpdate(x: any): NoteTagUpdate {
    return x as NoteTagUpdate
}


export interface NoteLinkUpdate {
    note_id: string
    link_note_id: string
}
export function construct_NoteLinkUpdate(x: any): NoteLinkUpdate {
    return x as NoteLinkUpdate
}


export interface NoteNameUpdate {
    note_id: string
    new_name: string
}
export function construct_NoteNameUpdate(x: any): NoteNameUpdate {
    return x as NoteNameUpdate
}


export interface NoteBodyUpdate {
    note_id: string
    new_body: string
}
export function construct_NoteBodyUpdate(x: any): NoteBodyUpdate {
    return x as NoteBodyUpdate
}


export interface NoteUpdateResponse {
    success: boolean
    msg: string
    updatedNote: Note
}
export function construct_NoteUpdateResponse(x: any): NoteUpdateResponse {
    return {
        ...x,
        'updatedNote': construct_Note(x['updatedNote']),
    } as NoteUpdateResponse
}


export interface NewNote {
    pre_note_id: string
    name: string
    link_from: string
}
export function construct_NewNote(x: any): NewNote {
    return x as NewNote
}


export interface SimpleMsg {
    integer_field: number
    float_field: number
    string_field: string
    boolean_field: boolean[]
}
export function construct_SimpleMsg(x: any): SimpleMsg {
    return x as SimpleMsg
}


export interface ComplexMsg {
    simpleMsgList: SimpleMsg[]
    string_list: string[]
    singleSimple: SimpleMsg
    single_boolean: boolean
}
export function construct_ComplexMsg(x: any): ComplexMsg {
    return {
        ...x,
        'simpleMsgList': [
            ...x['simpleMsgList'].map((item: any) => construct_SimpleMsg(item))
        ],
        'singleSimple': construct_SimpleMsg(x['singleSimple']),
    } as ComplexMsg
}


