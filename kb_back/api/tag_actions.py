from api.utils import createHTTPResponseOK, createHTTPResponseBAD
from django.http import HttpResponse, HttpRequest
from api.models import NoteTag


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
