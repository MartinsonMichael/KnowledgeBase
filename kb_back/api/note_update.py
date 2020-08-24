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


def update_name(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return createHTTPResponseBAD(f"bad: no note_id - must be not empty string, but got {note_id}")
    note = Note().load_by_id(note_id)
    if note is None:
        return createHTTPResponseBAD(f"bad: note_id is incorrect - no such note - {note_id}")

    new_name = kwargs.get('name', None)
    note.update_name(new_name)
    note.save_to_file()

    return createHTTPResponseOK()


def add_tag(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return createHTTPResponseBAD(f"bad: no note_id - must be not empty string, but got {note_id}")
    note = Note().load_by_id(note_id)
    if note is None:
        return createHTTPResponseBAD(f"bad: note_id is incorrect - no such note - {note_id}")

    new_tag = kwargs.get('tag', None)
    note.add_tag(new_tag)
    note.save_to_file()

    return createHTTPResponseOK()


def del_tag(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return createHTTPResponseBAD(f"bad: no note_id - must be not empty string, but got {note_id}")
    note = Note().load_by_id(note_id)
    if note is None:
        return createHTTPResponseBAD(f"bad: note_id is incorrect - no such note - {note_id}")

    tag = kwargs.get('tag', None)
    note.del_tag(tag)
    note.save_to_file()

    return createHTTPResponseOK()


def add_link(request, **kwargs):
    pass


def del_link(request, **kwargs):
    pass


@csrf_exempt
def update_body(request: HttpRequest, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return createHTTPResponseBAD(f"bad: no note_id - must be not empty string, but got {note_id}")
    note = Note().load_by_id(note_id)
    if note is None:
        return createHTTPResponseBAD(f"bad: note_id is incorrect - no such note - {note_id}")

    body = request.body.decode("utf-8")
    print(f"body update: {body}")
    note.update_body(body).save_to_file()

    return createHTTPResponseOK()
