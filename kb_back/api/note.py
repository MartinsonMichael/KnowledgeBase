import os
import time
from typing import List, Dict, Any

from . import NOTE_DIR


class Note:

    def __init__(self):
        self.id: str = None
        self.name: str = ""
        self.tags: List = []
        # self.metainfo: Dict[str, Any] = {}
        self.links: List[str] = []
        self.body: str = ""

    def __str__(self):
        return f"ID: {self.id}\n" \
               f"NAME: {self.name}\n" \
               f"TAGS: {';'.join(['#'+x for x in self.tags])}\n" \
               f"LINKS: {';'.join(self.links)}\n" \
               f"BODY: {self.body[:20]}..."

    __repr__ = __str__

    def create_new(self, note_pre_id: str):
        self.__init__()
        self.id = note_pre_id + f"_{time.time()}"
        return self

    def update_name(self, name):
        self.name = name
        return self

    def update_body(self, body):
        self.body = body
        return self

    def add_tag(self, tag):
        if tag not in self.tags:
            self.tags.append(tag)
        return self

    def del_tag(self, tag):
        self.tags.remove(tag)
        return self

    def add_link(self, link):
        if link not in self.links:
            self.links.append(link)
        return self

    def del_link(self, link):
        self.links.remove(link)
        return self

    @staticmethod
    def get_file_name(note_id) -> str:
        return f"note_{note_id}.txt"

    def save_to_file(self):
        if not os.path.exists(NOTE_DIR):
            os.makedirs(NOTE_DIR)

        with open(os.path.join(NOTE_DIR, self.get_file_name(self.id)), "w") as file:
            file.write(f"ID:{self.id}\n")
            file.write(f"NAME:{self.name}\n")
            file.write(f"TAGS:{';'.join(['#'+x for x in self.tags])}\n")
            file.write(f"LINKS:{';'.join(self.links)}\n")
            file.write(self.body)

        return self

    def load_by_id(self, note_id: str):
        return self.load_from_file(os.path.join(NOTE_DIR, self.get_file_name(note_id)))

    def load_from_file(self, file_name: str):
        self.__init__()
        with open(file_name, "r") as file:
            for line in file.readlines():
                if line.startswith(('ID', 'NAME', 'TAGS', 'LINKS')):
                    note_attr, value = line.split(':', maxsplit=1)
                    # del \n
                    value = value[:-1]

                    if note_attr == 'ID':
                        self.id = value
                    if note_attr == 'NAME':
                        self.name = value
                    if note_attr == 'TAGS':
                        self.tags = [x[1:] for x in value.split(';')]
                    if note_attr == 'LINKS':
                        self.links = value.split(';')
                else:
                    self.body += line

        return self

    def to_json(self) -> Dict[str, str]:
        return {
            'id': self.id,
            'name': self.name,
            'tags': self.tags,
            'links': self.links,
            'body': self.body,
        }

    def header_to_json(self) -> Dict[str, str]:
        return {
            'id': self.id,
            'name': self.name,
        }
