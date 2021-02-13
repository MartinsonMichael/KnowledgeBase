from api.models import NoteDB, NoteTag, NoteLink
from api.note import Note
from api.utils import iterate_over_notes_files, createHTTPResponseOK


def api_test(request, **kwargs):
    note_cnt = len(NoteDB.objects.all())
    tags_cnt = len(NoteTag.objects.all())
    links_cnt = len(NoteLink.objects.all())

    return createHTTPResponseOK({"note-count": note_cnt, "tags-count": tags_cnt, "links-count": links_cnt})
