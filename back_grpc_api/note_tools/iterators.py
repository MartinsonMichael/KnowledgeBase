import os
from typing import Iterator

from .settings import NOTE_DIR
from .note import Note


def iterate_over_all_notes() -> Iterator[Note]:
    for file in os.listdir(NOTE_DIR):
        if file.startswith('note'):
            yield Note().load_from_file(os.path.join(NOTE_DIR, file))
