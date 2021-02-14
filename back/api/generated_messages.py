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


class TestOne:
    def __init__(self, text: str):
        self.text: str = text

    def to_bytes(self) -> str:
        return json.dumps({
            'text': self.text,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'TestOne':
        obj = json.loads(data)
        return TestOne(
            text=obj['text'],
        )


class Test:
    def __init__(self, list: List['TestOne']):
        self.list: List['TestOne'] = list

    def to_bytes(self) -> str:
        return json.dumps({
            'list': [x.to_bytes() for x in self.list],
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'Test':
        obj = json.loads(data)
        return Test(
            list=[TestOne.from_bytes(x) for x in obj['list']],
        )


class Simple:
    def __init__(self, id: int, latitude: float, name: str, used: List[bool]):
        self.id: int = id
        self.latitude: float = latitude
        self.name: str = name
        self.used: List[bool] = used

    def to_bytes(self) -> str:
        return json.dumps({
            'id': self.id,
            'latitude': self.latitude,
            'name': self.name,
            'used': self.used,
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'Simple':
        obj = json.loads(data)
        return Simple(
            id=obj['id'],
            latitude=obj['latitude'],
            name=obj['name'],
            used=obj['used'],
        )


class Complex:
    def __init__(self, testList: List['Test'], id: str, singleTest: 'TestOne'):
        self.testList: List['Test'] = testList
        self.id: str = id
        self.singleTest: 'TestOne' = singleTest

    def to_bytes(self) -> str:
        return json.dumps({
            'testList': [x.to_bytes() for x in self.testList],
            'id': self.id,
            'singleTest': self.singleTest.to_bytes(),
        })

    @staticmethod
    def from_bytes(data: bytes) -> 'Complex':
        obj = json.loads(data)
        return Complex(
            testList=[Test.from_bytes(x) for x in obj['testList']],
            id=obj['id'],
            singleTest=TestOne.from_bytes(obj['singleTest']),
        )


