# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)

from typing import List
import json


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


class TagList:
    def __init__(self, list: List['Tag']):
        self.list: List['Tag'] = list

    def to_bytes(self) -> str:
        return json.dumps({
            'list': [x.to_bytes() for x in self.list],
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'TagList':
        obj = json.loads(data)
        return TagList(
            list=[Tag.from_bytes(x) for x in obj['list']],
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


class NoteID:
    def __init__(self, id: str):
        self.id: str = id

    def to_bytes(self) -> str:
        return json.dumps({
            'id': self.id,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteID':
        obj = json.loads(data)
        return NoteID(
            id=obj['id'],
        )


class NoteHeader:
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
    def from_bytes(data: bytes) -> 'NoteHeader':
        obj = json.loads(data)
        return NoteHeader(
            id=obj['id'],
            name=obj['name'],
            tags=obj['tags'],
            links=obj['links'],
        )


class NoteHeaderList:
    def __init__(self, list: List['NoteHeader']):
        self.list: List['NoteHeader'] = list

    def to_bytes(self) -> str:
        return json.dumps({
            'list': [x.to_bytes() for x in self.list],
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'NoteHeaderList':
        obj = json.loads(data)
        return NoteHeaderList(
            list=[NoteHeader.from_bytes(x) for x in obj['list']],
        )


class Structure:
    def __init__(self, headList: List['NoteHeader'], tagList: List['Tag']):
        self.headList: List['NoteHeader'] = headList
        self.tagList: List['Tag'] = tagList

    def to_bytes(self) -> str:
        return json.dumps({
            'headList': [x.to_bytes() for x in self.headList],
            'tagList': [x.to_bytes() for x in self.tagList],
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'Structure':
        obj = json.loads(data)
        return Structure(
            headList=[NoteHeader.from_bytes(x) for x in obj['headList']],
            tagList=[Tag.from_bytes(x) for x in obj['tagList']],
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


