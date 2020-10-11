import time
from typing import List, Dict

import numpy as np

from api.error_types import ErrorType
from api.models import NoteDB, NoteTag, create_new_tag, get_or_create_link


class Note:

    #
    # Construct features
    #

    def __init__(self):
        self.id: str = None
        self.name: str = ""
        self.tags: List[str] = []
        self.links: List[str] = []
        self.back_links: List[str] = []
        self.body: str = ""
        self._noteDB: NoteDB = None

    def create_new(self, note_id) -> ErrorType:
        self.id = note_id + f"_{time.time()}"
        self._noteDB = NoteDB(id=self.id)
        self._noteDB.save()
        return None

    def load(self, note_id) -> ErrorType:
        self._noteDB = NoteDB.objects.filter(id=note_id).first()
        if self._noteDB is None:
            return "no such object in database"
        self.id = self._noteDB.id
        self.body = self._noteDB.body
        self.name = self._noteDB.name

        self.tags = [x['tag_name'] for x in self._noteDB.tags.values('tag_name')]
        self.links = [x['id_to'] for x in self._noteDB.links.values('id_to')]
        self.back_links = [x['id_to'] for x in self._noteDB.back_links.values('id_to')]
        return None

    #
    # Debug represent
    #

    def __str__(self):
        return f"ID: {self.id}\n" \
               f"NAME: {self.name}\n" \
               f"TAGS: {';'.join(['#' + x for x in self.tags])}\n" \
               f"LINKS: {';'.join(self.links)}\n" \
               f"BODY: {self.body[:20]}..."

    __repr__ = __str__

    def save_to_DB(self, force_tag_creation: bool = False) -> ErrorType:
        if self.id is None:
            return "this note has no id"
        if self._noteDB is None:
            note_obj = NoteDB.objects.filter(id=self.id).first()
            if note_obj is not None:
                self._noteDB = note_obj
            else:
                self._noteDB = NoteDB(
                    id=self.id,
                    name=self.name,
                    body=self.body,
                )
                self._noteDB.save()

        self._noteDB.name = self.name
        self._noteDB.body = self.body

        # create tags
        self._noteDB.tags.clear()
        for tag in self.tags:
            tag_BD = NoteTag.objects.filter(tag_name=tag).first()
            if tag_BD is None:
                if force_tag_creation:
                    tag_BD = create_new_tag(tag)
                else:
                    return f"no tag object for tag-name : {tag}"
            self._noteDB.tags.add(tag_BD)

        # create links
        self._noteDB.links.clear()
        for link_to_id in self.links:
            link_obj = get_or_create_link(self.id, link_to_id, "normal")
            self._noteDB.links.add(link_obj)

        self._noteDB.save()
        return None

    #
    # Modification
    #

    def update_name(self, name: str) -> ErrorType:
        if not isinstance(name, str):
            return f"name must be string, you have type : {type(name)}"
        self.name = name
        return None

    def update_body(self, body: str) -> ErrorType:
        if not isinstance(body, str):
            return f"body must be string, you have type : {type(body)}"
        self.body = body
        return None

    def add_tag(self, tag: str) -> ErrorType:
        if not isinstance(tag, str):
            return f"tag must be string, you have type : {type(tag)}"
        self.tags.append(tag)
        return None

    def del_tag(self, tag: str) -> ErrorType:
        if not isinstance(tag, str):
            return f"tag must be string, you have type : {type(tag)}"
        self.tags.remove(tag)
        return None

    def set_tags(self, tag_list: List[str]) -> ErrorType:
        if not isinstance(tag_list, list):
            return f"tag_list must be list if string, you have type : {type(tag_list)}"
        if not np.all((isinstance(tag, str) for tag in tag_list)):
            return f"items of tag list must be string, you have types: " \
                   f"{' '.join([str(type(tag)) for tag in tag_list])}"

        self.tags = list(set(tag_list))
        return None

    def add_link(self, link: str) -> ErrorType:
        if not isinstance(link, str):
            return f"link must be string, you have type : {type(link)}"
        if link is self.links:
            return None

        note_link_to: NoteDB = NoteDB.objects.filter(id=link).first()
        if note_link_to is None:
            return f"there is not note under link, link id : {link}"

        self.links.append(link)
        note_link_to.back_links.add(get_or_create_link(link, self.id, "back"))
        note_link_to.save()

    def del_link(self, link: str):
        if not isinstance(link, str):
            return f"link must be string, you have type : {type(link)}"
        if link is not self.links:
            return None

        note_link_to: NoteDB = NoteDB.objects.filter(id=link).first()
        if note_link_to is None:
            return f"there is not note under link, link id : {link}"

        self.links.remove(link)
        note_link_to.back_links.remove(get_or_create_link(link, self.id, "back"))
        note_link_to.save()

    def set_links(self, link_list: List[str]) -> ErrorType:
        if not isinstance(link_list, list):
            return f"link_list must be list of noteIDs, you have type : {type(link_list)}"
        if not np.all((isinstance(link, str) for link in link_list)):
            return f"items of link_list must be strings, you have types :" \
                   f"{' '.join(str(type(link)) for link in link_list)}"

        links_to_del = list(set(self.links) - set(link_list))
        links_del_error = []
        if len(links_to_del) != 0:
            for link in links_to_del:
                err = self.del_link(link)
                if err is not None:
                    links_del_error.append(err)

        links_to_add = list(set(link_list) - set(self.links))
        links_add_error = []
        if len(links_to_add) != 0:
            for link in links_to_add:
                err = self.add_link(link)
                if err is not None:
                    links_add_error.append(err)

        if len(links_add_error) == 0 and len(links_del_error) == 0:
            return None
        else:
            return f"error while updating links, " \
                   f"while del {' '.join(links_del_error)}, " \
                   f"while add {' '.join(links_add_error)}"

    # @staticmethod
    # def get_file_name(note_id) -> str:
    #     return f"note_{note_id}.txt"
    #
    # def save_to_file(self, folder: Optional[str] = None):
    #     if folder is None:
    #         folder = NOTE_DIR
    #
    #     if not os.path.exists(folder):
    #         os.makedirs(folder)
    #
    #     with open(os.path.join(folder, self.get_file_name(self.id)), "w") as file:
    #         file.write(f"ID:{self.id}\n")
    #         file.write(f"NAME:{self.name}\n")
    #         file.write(f"TAGS:{';'.join(['#'+x for x in self.tags])};\n")
    #         file.write(f"LINKS:{';'.join(self.links)};\n")
    #         file.write(self.body)
    #
    #     return self
    #
    # def load_from_file(self, file_name: str):
    #     self.__init__()
    #     with open(file_name, "r") as file:
    #         for line in file.readlines():
    #             if line.startswith(('ID', 'NAME', 'TAGS', 'LINKS')):
    #                 note_attr, value = line.split(':', maxsplit=1)
    #                 # del \n
    #                 value = value.replace('\n', '')
    #
    #                 if note_attr == 'ID':
    #                     self.id = value
    #                 if note_attr == 'NAME':
    #                     self.name = value
    #                 if note_attr == 'TAGS':
    #                     self.tags = [
    #                         Note.clean_line(x[1:])
    #                         for x in value.split(';') if x.startswith('#')
    #                     ]
    #                 if note_attr == 'LINKS':
    #                     self.links = [x for x in value.split(';') if len(x) > 5]
    #             else:
    #                 self.body += line
    #
    #     self.load_noteDB()
    #     return self
    #
    # @staticmethod
    # def clean_line(x: str) -> str:
    #     return x.replace('\n', '').replace(' ', '')
    #
    # def load_from_free_file(self, file_name: str, add_tags: bool = False):
    #     self.__init__()
    #     with open(file_name, "r") as file:
    #         new_id = os.path.basename(file_name)
    #         if new_id.endswith('.txt'):
    #             new_id = new_id[:-4]
    #         self.id = self.create_new(new_id).id
    #         for index, line in enumerate(file.readlines()):
    #             if index == 0:
    #                 self.name = line.replace('\n', '')
    #                 continue
    #             elif index == 1:
    #                 if add_tags:
    #                     self.tags = [
    #                         Note.clean_line(x[1:])
    #                         for x in line.split(';') if x.startswith('#')
    #                     ]
    #
    #             else:
    #                 self.body += line
    #
    #     return self

    #
    # Json represent
    #

    def to_json(self) -> Dict[str, str]:
        return {
            'id': self.id,
            'name': self.name,
            'tags': self.tags,
            'links': self.links,
            'back-links': self.back_links,
            'body': self.body,
        }

    def header_to_json(self) -> Dict[str, str]:
        return {
            'id': self.id,
            'name': self.name,
            'tags': self.tags,
            'links': self.links,
        }
