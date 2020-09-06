import json

from django.http import HttpResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

from api.note import Note
from api.utils import createHTTPResponseOK, createHTTPResponseBAD


def get_note(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return createHTTPResponseBAD(f"bad: no note_id - must be not empty string, but got {note_id}")
    note = Note().load_by_id(note_id)
    if note is None:
        return createHTTPResponseBAD(f"bad: note_id is incorrect - no such note - {note_id}")

    return createHTTPResponseOK(note.to_json())


def create_note(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None or not isinstance(note_id, str) or len(note_id) == 0:
        return createHTTPResponseBAD('bad: no note_id - must be string with not null length')

    note_name = kwargs.get('note_name', None)
    if note_name is None or not isinstance(note_name, str) or len(note_name) == 0:
        return createHTTPResponseBAD('bad: no note_name - must be string with not null length')

    note = Note().create_new(note_id).update_name(note_name).save_to_DB().save_to_file()

    return createHTTPResponseOK(note.to_json())


@csrf_exempt
def update_note(request: HttpRequest, **kwargs):

    if request.method == 'OPTIONS':
        return createHTTPResponseOK()

    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return createHTTPResponseBAD(f"bad: no note_id - must be not empty string, but got {note_id}")
    note = Note().load_by_id(note_id)
    if note is None:
        return createHTTPResponseBAD(f"bad: note_id is incorrect - no such note - {note_id}")

    req_body = request.body.decode("utf-8")
    note_dict = json.loads(req_body)

    note.update_body(note_dict['body'])
    note.update_name(note_dict['name'])
    note.set_tags(note_dict['tags'])
    note.set_links(note_dict['links'])

    note.save_to_file().save_to_DB()

    return createHTTPResponseOK()
