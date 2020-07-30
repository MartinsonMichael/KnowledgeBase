import os
from typing import List

from django.http import HttpResponse

from api.note import Note
from api.utils import createHTTPResponseOK, iterate_over_notes_files
from . import NOTE_DIR


def get_tag_file_path() -> str:
    return os.path.join(NOTE_DIR, 'tag_list.txt')


def find_all_tags() -> List[str]:
    tags = []
    for note_path in iterate_over_notes_files():
        note = Note().load_from_file(note_path)
        tags.extend(note.tags)
    return list(set(tags))


def recreate_tag_file() -> None:
    tag_file = get_tag_file_path()
    if os.path.exists(tag_file):
        os.remove(tag_file)
    tags = find_all_tags()
    with open(tag_file, 'w') as file:
        file.write(";".join(tags))


def tag_list(request, **kwargs) -> HttpResponse:
    tag_file = get_tag_file_path()
    if not os.path.exists(tag_file):
        recreate_tag_file()

    tags = open(tag_file, 'r').readline().split(';')

    return createHTTPResponseOK({"tags": tags})
