// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

export interface Tag {
    id: string
    name: string
    description: string
    color: string
}
export function construct_Tag(x: any): Tag {
    return x as Tag
}


export interface TagList {
    list: Tag[]
}
export function construct_TagList(x: any): TagList {
    return {
        'list': [
            ...x['list'].map((item: any) => construct_Tag(item))
        ],
    } as TagList
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


export interface NoteID {
    id: string
}
export function construct_NoteID(x: any): NoteID {
    return x as NoteID
}


export interface NoteHeader {
    id: string
    name: string
    tags: string[]
    links: string[]
}
export function construct_NoteHeader(x: any): NoteHeader {
    return x as NoteHeader
}


export interface NoteHeaderList {
    list: NoteHeader[]
}
export function construct_NoteHeaderList(x: any): NoteHeaderList {
    return {
        'list': [
            ...x['list'].map((item: any) => construct_NoteHeader(item))
        ],
    } as NoteHeaderList
}


export interface Structure {
    headList: NoteHeader[]
    tagList: Tag[]
}
export function construct_Structure(x: any): Structure {
    return {
        'headList': [
            ...x['headList'].map((item: any) => construct_NoteHeader(item))
        ],
        'tagList': [
            ...x['tagList'].map((item: any) => construct_Tag(item))
        ],
    } as Structure
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


