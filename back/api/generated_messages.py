# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)

from typing import List, Dict, Union
import json


class TagHead:
    def __init__(self, tag_id: str, name: str, color: str):
        self.tag_id: str = tag_id
        self.name: str = name
        self.color: str = color

    def to_json(self) -> Union[Dict, List]:
        return {
            'tag_id': self.tag_id,
            'name': self.name,
            'color': self.color,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'TagHead':
        return TagHead(
            tag_id=obj['tag_id'],
            name=obj['name'],
            color=obj['color'],
        )


class NoteHead:
    def __init__(self, note_id: str, name: str, tags: List['TagHead']):
        self.note_id: str = note_id
        self.name: str = name
        self.tags: List['TagHead'] = tags

    def to_json(self) -> Union[Dict, List]:
        return {
            'note_id': self.note_id,
            'name': self.name,
            'tags': [x.to_json() for x in self.tags],
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NoteHead':
        return NoteHead(
            note_id=obj['note_id'],
            name=obj['name'],
            tags=[TagHead.from_json(x) for x in obj['tags']],
        )


class NoteHeadStore:
    def __init__(self, heads: Dict[str, 'NoteHead']):
        self.heads: Dict[str, 'NoteHead'] = heads

    def to_json(self) -> Union[Dict, List]:
        return {
            'heads': {key: value.to_json() for key, value in self.heads.items()},
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NoteHeadStore':
        return NoteHeadStore(
            heads={key: value.from_json() for key, value in obj['heads'].items()},
        )


class TagStore:
    def __init__(self, tags: Dict[str, 'TagHead']):
        self.tags: Dict[str, 'TagHead'] = tags

    def to_json(self) -> Union[Dict, List]:
        return {
            'tags': {key: value.to_json() for key, value in self.tags.items()},
        }

    @staticmethod
    def from_json(obj: Dict) -> 'TagStore':
        return TagStore(
            tags={key: value.from_json() for key, value in obj['tags'].items()},
        )


class Structure:
    def __init__(self, head_store: 'NoteHeadStore', tag_store: 'TagStore'):
        self.head_store: 'NoteHeadStore' = head_store
        self.tag_store: 'TagStore' = tag_store

    def to_json(self) -> Union[Dict, List]:
        return {
            'head_store': self.head_store.to_json(),
            'tag_store': self.tag_store.to_json(),
        }

    @staticmethod
    def from_json(obj: Dict) -> 'Structure':
        return Structure(
            head_store=NoteHeadStore.from_json(obj['head_store']),
            tag_store=TagStore.from_json(obj['tag_store']),
        )


class TagCreateRequest:
    def __init__(self, name: str, add_to_note_id: str):
        self.name: str = name
        self.add_to_note_id: str = add_to_note_id

    def to_json(self) -> Union[Dict, List]:
        return {
            'name': self.name,
            'add_to_note_id': self.add_to_note_id,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'TagCreateRequest':
        return TagCreateRequest(
            name=obj['name'],
            add_to_note_id=obj['add_to_note_id'],
        )


class NewNote:
    def __init__(self, name: str, link_from: str):
        self.name: str = name
        self.link_from: str = link_from

    def to_json(self) -> Union[Dict, List]:
        return {
            'name': self.name,
            'link_from': self.link_from,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NewNote':
        return NewNote(
            name=obj['name'],
            link_from=obj['link_from'],
        )


class NewNoteResponse:
    def __init__(self, new_note: 'Note', head_store: 'NoteHeadStore'):
        self.new_note: 'Note' = new_note
        self.head_store: 'NoteHeadStore' = head_store

    def to_json(self) -> Union[Dict, List]:
        return {
            'new_note': self.new_note.to_json(),
            'head_store': self.head_store.to_json(),
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NewNoteResponse':
        return NewNoteResponse(
            new_note=Note.from_json(obj['new_note']),
            head_store=NoteHeadStore.from_json(obj['head_store']),
        )


class Tag:
    def __init__(self, tag_id: str, name: str, description: str, color: str):
        self.tag_id: str = tag_id
        self.name: str = name
        self.description: str = description
        self.color: str = color

    def to_json(self) -> Union[Dict, List]:
        return {
            'tag_id': self.tag_id,
            'name': self.name,
            'description': self.description,
            'color': self.color,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'Tag':
        return Tag(
            tag_id=obj['tag_id'],
            name=obj['name'],
            description=obj['description'],
            color=obj['color'],
        )


class Note:
    def __init__(self, note_id: str, name: str, tags: List['TagHead'], links: List['NoteHead'], body: str):
        self.note_id: str = note_id
        self.name: str = name
        self.tags: List['TagHead'] = tags
        self.links: List['NoteHead'] = links
        self.body: str = body

    def to_json(self) -> Union[Dict, List]:
        return {
            'note_id': self.note_id,
            'name': self.name,
            'tags': [x.to_json() for x in self.tags],
            'links': [x.to_json() for x in self.links],
            'body': self.body,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'Note':
        return Note(
            note_id=obj['note_id'],
            name=obj['name'],
            tags=[TagHead.from_json(x) for x in obj['tags']],
            links=[NoteHead.from_json(x) for x in obj['links']],
            body=obj['body'],
        )


class NoteRequest:
    def __init__(self, note_id: str):
        self.note_id: str = note_id

    def to_json(self) -> Union[Dict, List]:
        return {
            'note_id': self.note_id,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NoteRequest':
        return NoteRequest(
            note_id=obj['note_id'],
        )


class NoteTagUpdate:
    def __init__(self, note_id: str, tag_id: str):
        self.note_id: str = note_id
        self.tag_id: str = tag_id

    def to_json(self) -> Union[Dict, List]:
        return {
            'note_id': self.note_id,
            'tag_id': self.tag_id,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NoteTagUpdate':
        return NoteTagUpdate(
            note_id=obj['note_id'],
            tag_id=obj['tag_id'],
        )


class NoteLinkUpdate:
    def __init__(self, note_id: str, link_note_id: str):
        self.note_id: str = note_id
        self.link_note_id: str = link_note_id

    def to_json(self) -> Union[Dict, List]:
        return {
            'note_id': self.note_id,
            'link_note_id': self.link_note_id,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NoteLinkUpdate':
        return NoteLinkUpdate(
            note_id=obj['note_id'],
            link_note_id=obj['link_note_id'],
        )


class NoteNameUpdate:
    def __init__(self, note_id: str, new_name: str):
        self.note_id: str = note_id
        self.new_name: str = new_name

    def to_json(self) -> Union[Dict, List]:
        return {
            'note_id': self.note_id,
            'new_name': self.new_name,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NoteNameUpdate':
        return NoteNameUpdate(
            note_id=obj['note_id'],
            new_name=obj['new_name'],
        )


class NoteBodyUpdate:
    def __init__(self, note_id: str, new_body: str):
        self.note_id: str = note_id
        self.new_body: str = new_body

    def to_json(self) -> Union[Dict, List]:
        return {
            'note_id': self.note_id,
            'new_body': self.new_body,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NoteBodyUpdate':
        return NoteBodyUpdate(
            note_id=obj['note_id'],
            new_body=obj['new_body'],
        )


class NoteUpdateResponse:
    def __init__(self, msg: str, updatedNote: 'Note'):
        self.msg: str = msg
        self.updatedNote: 'Note' = updatedNote

    def to_json(self) -> Union[Dict, List]:
        return {
            'msg': self.msg,
            'updatedNote': self.updatedNote.to_json(),
        }

    @staticmethod
    def from_json(obj: Dict) -> 'NoteUpdateResponse':
        return NoteUpdateResponse(
            msg=obj['msg'],
            updatedNote=Note.from_json(obj['updatedNote']),
        )


class SimpleMsg:
    def __init__(self, integer_field: int, float_field: float, string_field: str, boolean_field: List[bool]):
        self.integer_field: int = integer_field
        self.float_field: float = float_field
        self.string_field: str = string_field
        self.boolean_field: List[bool] = boolean_field

    def to_json(self) -> Union[Dict, List]:
        return {
            'integer_field': self.integer_field,
            'float_field': self.float_field,
            'string_field': self.string_field,
            'boolean_field': self.boolean_field,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'SimpleMsg':
        return SimpleMsg(
            integer_field=obj['integer_field'],
            float_field=obj['float_field'],
            string_field=obj['string_field'],
            boolean_field=obj['boolean_field'],
        )


class ComplexMsg:
    def __init__(self, simpleMsgList: List['SimpleMsg'], string_list: List[str], singleSimple: 'SimpleMsg', single_boolean: bool):
        self.simpleMsgList: List['SimpleMsg'] = simpleMsgList
        self.string_list: List[str] = string_list
        self.singleSimple: 'SimpleMsg' = singleSimple
        self.single_boolean: bool = single_boolean

    def to_json(self) -> Union[Dict, List]:
        return {
            'simpleMsgList': [x.to_json() for x in self.simpleMsgList],
            'string_list': self.string_list,
            'singleSimple': self.singleSimple.to_json(),
            'single_boolean': self.single_boolean,
        }

    @staticmethod
    def from_json(obj: Dict) -> 'ComplexMsg':
        return ComplexMsg(
            simpleMsgList=[SimpleMsg.from_json(x) for x in obj['simpleMsgList']],
            string_list=obj['string_list'],
            singleSimple=SimpleMsg.from_json(obj['singleSimple']),
            single_boolean=obj['single_boolean'],
        )


