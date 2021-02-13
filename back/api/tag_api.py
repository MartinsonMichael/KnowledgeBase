import json

from django.views.decorators.csrf import csrf_exempt

from api.utils import createHTTPResponseOK, createHTTPResponseBAD
from django.http import HttpResponse
from api.models import NoteTag


@csrf_exempt
def update_tag(request, **kwargs) -> HttpResponse:
    if request.method == 'OPTIONS':
        return createHTTPResponseOK()

    tag_name = kwargs.get('tag_name', None)
    if tag_name is None:
        return createHTTPResponseBAD("no tag name")

    tag_obj: NoteTag = NoteTag.objects.filter(tag_name=tag_name).first()
    if tag_obj is None:
        return createHTTPResponseBAD(f"no such tag object in database, server received tag name : {tag_name}")

    req_body = request.body.decode("utf-8")
    tag_dict = json.loads(req_body)

    tag_obj.tag_color = tag_dict['color']
    tag_obj.tag_description = tag_dict['description']
    tag_obj.save()

    return createHTTPResponseOK()

@csrf_exempt
def create_new_tag(request, **kwargs) -> HttpResponse:
    if request.method == 'OPTIONS':
        return createHTTPResponseOK()

    tag_name = kwargs.get('tag_name', None)
    if tag_name is None:
        return createHTTPResponseBAD("no tag name")

    req_body = request.body.decode("utf-8")
    tag_dict = json.loads(req_body)

    print(tag_dict)

    tag_obj = NoteTag(
        tag_name=tag_dict['name'],
        tag_color=tag_dict['color'],
        tag_description=tag_dict['description'],
    )
    tag_obj.save()

    return createHTTPResponseOK()


def update_tag_description(request, **kwargs) -> HttpResponse:
    tag_name = kwargs.get('tag_name', None)
    new_tag_description = kwargs.get('new_tag_description', None)

    print('HERE')

    if tag_name is None or new_tag_description is None:
        return createHTTPResponseBAD("no tag name, or no tag description")

    tag_obj: NoteTag = NoteTag.objects.filter(tag_name=tag_name).first()

    if tag_obj is None:
        return createHTTPResponseBAD(f"no such tag object in database, server received tag name : {tag_name}")

    tag_obj.tag_description = new_tag_description
    tag_obj.save()

    return createHTTPResponseOK()


def update_tag_color(request, **kwargs) -> HttpResponse:
    tag_name = kwargs.get('tag_name', None)
    new_tag_color = kwargs.get('new_tag_color', None)

    if tag_name is None or new_tag_color is None:
        return createHTTPResponseBAD("no tag name, or no tag new_tag_color")

    tag_obj: NoteTag = NoteTag.objects.filter(tag_name=tag_name).first()

    if tag_obj is None:
        return createHTTPResponseBAD(f"no such tag object in database, server received tag name : {tag_name}")

    tag_obj.tag_color = new_tag_color
    tag_obj.save()

    return createHTTPResponseOK()


def create_index_note_for_teg(request, **kwargs) -> HttpResponse:

    return createHTTPResponseOK()
