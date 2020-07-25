import os

from django.http import HttpResponse

from .settings import NOTE_DIR
from .note import Note


def note_list(request, **kwargs):
    notes = []
    for file in os.listdir(NOTE_DIR):
        if file.startswith('note'):
            note = Note().load_from_file(os.path.join(NOTE_DIR, file))
            notes.append((note.id, note.name))

    return HttpResponse(notes)
