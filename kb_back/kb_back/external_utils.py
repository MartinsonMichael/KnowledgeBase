from api.note import Note
from api.utils import iterate_over_notes_files


def fill_db_frm_folder():
    for note_path in iterate_over_notes_files():
        note = Note().load_from_file(note_path)

        note.save_to_DB()
