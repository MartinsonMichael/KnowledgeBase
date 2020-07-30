import os

from api.note import Note
from api.utils import createHTTPResponseOK, iterate_over_notes_files
from . import NOTE_DIR


def note_list(request, **kwargs):
    notes = []
    for note_path in iterate_over_notes_files():
        note = Note().load_from_file(note_path)
        notes.append(note.header_to_json())

    return createHTTPResponseOK({"list": notes})
