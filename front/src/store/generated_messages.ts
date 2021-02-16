// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

export interface NoteHeadStore {
    heads: {[key: string]: NoteHead}
}
export function construct_NoteHeadStore(x: any): NoteHeadStore {
    return {
        'heads': x['heads'] as {[key: string]: NoteHead},
    } as NoteHeadStore
}


export interface TagStore {
    tags: {[key: string]: Tag}
}
export function construct_TagStore(x: any): TagStore {
    return {
        'tags': x['tags'] as {[key: string]: Tag},
    } as TagStore
}


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
    id: string
    name: string
    description: string
    color: string
}
export function construct_Tag(x: any): Tag {
    return x as Tag
}


export interface Note {
    id: string
    name: string
    tags: string[]
    links: string[]
    body: string
}
export function construct_Note(x: any): Note {
    return x as Note
}


export interface NoteHead {
    id: string
    name: string
    tags: string[]
    links: string[]
}
export function construct_NoteHead(x: any): NoteHead {
    return x as NoteHead
}


export interface NoteRequest {
    id: string
}
export function construct_NoteRequest(x: any): NoteRequest {
    return x as NoteRequest
}


export interface NoteTagUpdate {
    note_id: string
    tag_name: string
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
    error_msg: string
}
export function construct_NoteUpdateResponse(x: any): NoteUpdateResponse {
    return x as NoteUpdateResponse
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


