import json

from django.http import HttpResponse

from api.note import Note


def get_note(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return HttpResponse(f"bad: no note_id - must be not empty string, but got {note_id}", status_code=400)
    note = Note().load_by_id(note_id)
    if note is None:
        return HttpResponse(f"bad: note_id is incorrect - no such note - {note_id}", status_code=400)

    response = HttpResponse('ok')
    response.content = json.dumps(note.to_json())
    return response


def create_note(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return HttpResponse('bad: no note_id - must be string', status_code=400)

    Note().create_new(note_id).save_to_file()

    return HttpResponse('ok')


def update_name(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return HttpResponse(f"bad: no note_id - must be not empty string, but got {note_id}", status_code=400)
    note = Note().load_by_id(note_id)
    if note is None:
        return HttpResponse(f"bad: note_id is incorrect - no such note - {note_id}", status_code=400)

    new_name = kwargs.get('name', None)
    note.update_name(new_name)
    note.save_to_file()

    return HttpResponse("ok")


def add_tag(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return HttpResponse(f"bad: no note_id - must be not empty string, but got {note_id}", status_code=400)
    note = Note().load_by_id(note_id)
    if note is None:
        return HttpResponse(f"bad: note_id is incorrect - no such note - {note_id}", status_code=400)

    # print(f'load note from memory:\n{note}')

    new_tag = kwargs.get('tag', None)
    note.add_tag(new_tag)
    note.save_to_file()

    return HttpResponse("ok")


def del_tag(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return HttpResponse(f"bad: no note_id - must be not empty string, but got {note_id}", status_code=400)
    note = Note().load_by_id(note_id)
    if note is None:
        return HttpResponse(f"bad: note_id is incorrect - no such note - {note_id}", status_code=400)

    # print(f'load note from memory:\n{note}')

    tag = kwargs.get('tag', None)
    note.del_tag(tag)
    note.save_to_file()

    return HttpResponse("ok")


def add_link(request, **kwargs):
    pass


def del_link(request, **kwargs):
    pass


def update_body(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return HttpResponse(f"bad: no note_id - must be not empty string, but got {note_id}", status_code=400)
    note = Note().load_by_id(note_id)
    if note is None:
        return HttpResponse(f"bad: note_id is incorrect - no such note - {note_id}", status_code=400)

    # print(f'load note from memory:\n{note}')

    # new_tag = request.
    # note.add_tag(new_tag)
    # note.save_to_file()

    return HttpResponse("ok")
