from api.note import Note
from api.utils import iterate_over_notes_files


def backup(folder_name: str) -> None:
    for note_path in iterate_over_notes_files():
        note = Note().load_from_file(note_path)

        note.save_to_file()
