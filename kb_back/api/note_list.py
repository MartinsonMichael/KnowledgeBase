import os

from api.note import Note
from api.utils import createHTTPResponseOK
from . import NOTE_DIR


def note_list(request, **kwargs):
    notes = []
    for file in os.listdir(NOTE_DIR):
        if file.startswith('note'):
            note = Note().load_from_file(os.path.join(NOTE_DIR, file))
            notes.append(note.header_to_json())

    return createHTTPResponseOK({"list": notes})
