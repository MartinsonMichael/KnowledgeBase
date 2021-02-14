import json

from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt

from api.utils import createHTTPResponseOK, createHTTPResponseBAD


def get_note(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None:
        return createHTTPResponseBAD(f"bad: no note_id - must be not empty string, but got {note_id}")
    # note = Note()
    # err = note.load(note_id)
    # if err is not None:
    #     return createHTTPResponseBAD(f"bad, error {err}")
    #
    # return createHTTPResponseOK(note.to_json())


def create_note(request, **kwargs):
    note_id = kwargs.get('note_id', None)
    if note_id is None or not isinstance(note_id, str) or len(note_id) == 0:
        return createHTTPResponseBAD('bad: no note_id - must be string with not null length')

    note_name = kwargs.get('note_name', None)
    if note_name is None or not isinstance(note_name, str) or len(note_name) == 0:
        return createHTTPResponseBAD('bad: no note_name - must be string with not null length')

    # note = Note()
    # err = note.create_new(note_id)
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')
    # err = note.update_name(note_name)
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')
    # err = note.save_to_DB()
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')
    #
    # return createHTTPResponseOK(note.to_json())


@csrf_exempt
def update_note(request: HttpRequest, **kwargs):

    if request.method == 'OPTIONS':
        return createHTTPResponseOK()

    # note_id = kwargs.get('note_id', None)
    # if note_id is None:
    #     return createHTTPResponseBAD(f"bad: no note_id - must be not empty string, but got {note_id}")
    # note = Note()
    # err = note.load(note_id)
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')
    #
    # try:
    #     req_body = request.body.decode("utf-8")
    #     note_dict = json.loads(req_body)
    # except:
    #     return createHTTPResponseBAD(f'error while json decoding, body : {request.body}')
    #
    # err = note.update_body(note_dict['body'])
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')
    # err = note.update_name(note_dict['name'])
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')
    # err = note.set_tags(note_dict['tags'])
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')
    # err = note.set_links(note_dict['links'])
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')
    #
    # err = note.save_to_DB()
    # if err is not None:
    #     return createHTTPResponseBAD(f'bad error : {err}')

    return createHTTPResponseOK()
