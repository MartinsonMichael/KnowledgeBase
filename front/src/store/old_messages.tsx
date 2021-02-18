// potentially this can be generated

export interface Note {
    id: string
    name: string
    tags: string[]
    links: string[]
    body: string
}
export function construct_Note(x: any): Note {
    return {
        'id': x['id'] as string,
        'name': x['name'],
        'tags': x['tags'],
        'links': x['links'],
        'body': x['body'],
    } as Note
}

export interface Tag {
    name: string
    color: string
    description: string,
}
export function construct_Tag(x: any): Tag {
    return {
        'name': x['tag_name'],
        'color': x['tag_color'],
        'description': x['tag_description'],
    } as Tag
}
export interface TagStore {
    [key: string]: Tag
}
export function construct_TagStore(x: any): TagStore {
    const tagList: Tag[] = [
        ...x.map((tagObj: any) => {
            return {
                name: tagObj['tag_name'],
                description: tagObj['tag_description'],
                color: tagObj['tag_color'],
            } as Tag
        })
    ];
    const tagStore: TagStore = {};
    tagList.forEach(tagObj => {
       tagStore[tagObj.name] = tagObj
    });
    return tagStore
}

export interface NoteHead {
    id: string
    name: string
    tags: string[]
    links: string[]
}
export function construct_NoteHead(x: any): NoteHead {
    return {
        id: x['id'] as string,
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
