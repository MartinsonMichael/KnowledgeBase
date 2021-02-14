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


export interface TestOne {
    text: string
}
export function construct_TestOne(x: any): TestOne {
    return x as TestOne
}


export interface Test {
    list: TestOne[]
}
export function construct_Test(x: any): Test {
    return {
        'list': [
            ...x['list'].map((item: any) => construct_TestOne(item))
        ],
    } as Test
}


export interface Simple {
    id: number
    latitude: number
    name: string
    used: boolean[]
}
export function construct_Simple(x: any): Simple {
    return x as Simple
}


export interface Complex {
    testList: Test[]
    id: string
    singleTest: TestOne
}
export function construct_Complex(x: any): Complex {
    return {
        ...x,
        'testList': [
            ...x['testList'].map((item: any) => construct_Test(item))
        ],
        'singleTest': construct_TestOne(x['singleTest']),
    } as Complex
}


