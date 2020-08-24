import os

from api.note import Note
from api.utils import iterate_over_notes_files


def fill_db_frm_folder():
    for note_path in iterate_over_notes_files():
        note = Note().load_from_file(note_path)

        note.save_to_DB()


def fill_db_from_free_notes(path_to_folder: str) -> None:
    for file in os.listdir(path_to_folder):
        try:
            note = Note().load_from_free_file(os.path.join(path_to_folder, file))
            note.save_to_DB()
            note.save_to_file()
            print(f"load {file}")
        except:
            print(f"fail to load {file}")
