# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)

from typing import List, Dict
import json


class NoteHeadStore:
    def __init__(self, heads: Dict[str, 'NoteHead']):
        self.heads: Dict[str, 'NoteHead'] = heads

    def to_bytes(self) -> str:
        return json.dumps({
            'heads': {key: value.to_bytes() for key, value in self.heads.items()},
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteHeadStore':
        obj = json.loads(data)
        return NoteHeadStore(
            heads={key: value.from_bytes() for key, value in obj['heads'].items()},
        )


class TagStore:
    def __init__(self, tags: Dict[str, 'Tag']):
        self.tags: Dict[str, 'Tag'] = tags

    def to_bytes(self) -> str:
        return json.dumps({
            'tags': {key: value.to_bytes() for key, value in self.tags.items()},
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'TagStore':
        obj = json.loads(data)
        return TagStore(
            tags={key: value.from_bytes() for key, value in obj['tags'].items()},
        )


class Structure:
    def __init__(self, head_store: 'NoteHeadStore', tag_store: 'TagStore'):
        self.head_store: 'NoteHeadStore' = head_store
        self.tag_store: 'TagStore' = tag_store

    def to_bytes(self) -> str:
        return json.dumps({
            'head_store': self.head_store.to_bytes(),
            'tag_store': self.tag_store.to_bytes(),
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'Structure':
        obj = json.loads(data)
        return Structure(
            head_store=NoteHeadStore.from_bytes(obj['head_store']),
            tag_store=TagStore.from_bytes(obj['tag_store']),
        )


class TagCreateRequest:
    def __init__(self, name: str, add_to_note_id: str):
        self.name: str = name
        self.add_to_note_id: str = add_to_note_id

    def to_bytes(self) -> str:
        return json.dumps({
            'name': self.name,
            'add_to_note_id': self.add_to_note_id,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'TagCreateRequest':
        obj = json.loads(data)
        return TagCreateRequest(
            name=obj['name'],
            add_to_note_id=obj['add_to_note_id'],
        )


class Tag:
    def __init__(self, id: str, name: str, description: str, color: str):
        self.id: str = id
        self.name: str = name
        self.description: str = description
        self.color: str = color

    def to_bytes(self) -> str:
        return json.dumps({
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'color': self.color,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'Tag':
        obj = json.loads(data)
        return Tag(
            id=obj['id'],
            name=obj['name'],
            description=obj['description'],
            color=obj['color'],
        )


class Note:
    def __init__(self, id: str, name: str, tags: List[str], links: List[str], body: str):
        self.id: str = id
        self.name: str = name
        self.tags: List[str] = tags
        self.links: List[str] = links
        self.body: str = body

    def to_bytes(self) -> str:
        return json.dumps({
            'id': self.id,
            'name': self.name,
            'tags': self.tags,
            'links': self.links,
            'body': self.body,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'Note':
        obj = json.loads(data)
        return Note(
            id=obj['id'],
            name=obj['name'],
            tags=obj['tags'],
            links=obj['links'],
            body=obj['body'],
        )


class NoteHead:
    def __init__(self, id: str, name: str, tags: List[str], links: List[str]):
        self.id: str = id
        self.name: str = name
        self.tags: List[str] = tags
        self.links: List[str] = links

    def to_bytes(self) -> str:
        return json.dumps({
            'id': self.id,
            'name': self.name,
            'tags': self.tags,
            'links': self.links,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteHead':
        obj = json.loads(data)
        return NoteHead(
            id=obj['id'],
            name=obj['name'],
            tags=obj['tags'],
            links=obj['links'],
        )


class NoteRequest:
    def __init__(self, id: str):
        self.id: str = id

    def to_bytes(self) -> str:
        return json.dumps({
            'id': self.id,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteRequest':
        obj = json.loads(data)
        return NoteRequest(
            id=obj['id'],
        )


class NoteTagUpdate:
    def __init__(self, note_id: str, tag_name: str):
        self.note_id: str = note_id
        self.tag_name: str = tag_name

    def to_bytes(self) -> str:
        return json.dumps({
            'note_id': self.note_id,
            'tag_name': self.tag_name,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteTagUpdate':
        obj = json.loads(data)
        return NoteTagUpdate(
            note_id=obj['note_id'],
            tag_name=obj['tag_name'],
        )


class NoteLinkUpdate:
    def __init__(self, note_id: str, link_note_id: str):
        self.note_id: str = note_id
        self.link_note_id: str = link_note_id

    def to_bytes(self) -> str:
        return json.dumps({
            'note_id': self.note_id,
            'link_note_id': self.link_note_id,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteLinkUpdate':
        obj = json.loads(data)
        return NoteLinkUpdate(
            note_id=obj['note_id'],
            link_note_id=obj['link_note_id'],
        )


class NoteNameUpdate:
    def __init__(self, note_id: str, new_name: str):
        self.note_id: str = note_id
        self.new_name: str = new_name

    def to_bytes(self) -> str:
        return json.dumps({
            'note_id': self.note_id,
            'new_name': self.new_name,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteNameUpdate':
        obj = json.loads(data)
        return NoteNameUpdate(
            note_id=obj['note_id'],
            new_name=obj['new_name'],
        )


class NoteBodyUpdate:
    def __init__(self, note_id: str, new_body: str):
        self.note_id: str = note_id
        self.new_body: str = new_body

    def to_bytes(self) -> str:
        return json.dumps({
            'note_id': self.note_id,
            'new_body': self.new_body,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteBodyUpdate':
        obj = json.loads(data)
        return NoteBodyUpdate(
            note_id=obj['note_id'],
            new_body=obj['new_body'],
        )


class NoteUpdateResponse:
    def __init__(self, success: bool, error_msg: str):
        self.success: bool = success
        self.error_msg: str = error_msg

    def to_bytes(self) -> str:
        return json.dumps({
            'success': self.success,
            'error_msg': self.error_msg,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteUpdateResponse':
        obj = json.loads(data)
        return NoteUpdateResponse(
            success=obj['success'],
            error_msg=obj['error_msg'],
        )


class NewNote:
    def __init__(self, pre_note_id: str, name: str, link_from: str):
        self.pre_note_id: str = pre_note_id
        self.name: str = name
        self.link_from: str = link_from

    def to_bytes(self) -> str:
        return json.dumps({
            'pre_note_id': self.pre_note_id,
            'name': self.name,
            'link_from': self.link_from,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NewNote':
        obj = json.loads(data)
        return NewNote(
            pre_note_id=obj['pre_note_id'],
            name=obj['name'],
            link_from=obj['link_from'],
        )


class SimpleMsg:
    def __init__(self, integer_field: int, float_field: float, string_field: str, boolean_field: List[bool]):
        self.integer_field: int = integer_field
        self.float_field: float = float_field
        self.string_field: str = string_field
        self.boolean_field: List[bool] = boolean_field

    def to_bytes(self) -> str:
        return json.dumps({
            'integer_field': self.integer_field,
            'float_field': self.float_field,
            'string_field': self.string_field,
            'boolean_field': self.boolean_field,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'SimpleMsg':
        obj = json.loads(data)
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

    def to_bytes(self) -> str:
        return json.dumps({
            'simpleMsgList': [x.to_bytes() for x in self.simpleMsgList],
            'string_list': self.string_list,
            'singleSimple': self.singleSimple.to_bytes(),
            'single_boolean': self.single_boolean,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'ComplexMsg':
        obj = json.loads(data)
        return ComplexMsg(
            simpleMsgList=[SimpleMsg.from_bytes(x) for x in obj['simpleMsgList']],
            string_list=obj['string_list'],
            singleSimple=SimpleMsg.from_bytes(obj['singleSimple']),
            single_boolean=obj['single_boolean'],
        )


