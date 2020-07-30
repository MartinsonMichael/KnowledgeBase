from typing import Optional

from django.db import models

ID_MAX_LEN = 50


class NoteTag(models.Model):
    tag_name = models.TextField('tag_name', null=False, max_length=20, primary_key=True)
    tag_color = models.TextField('tag_color', max_length=10)


class NoteLink(models.Model):
    id_from = models.TextField('id_from', null=False, max_length=ID_MAX_LEN)
    id_to = models.TextField('id_to', null=False, max_length=ID_MAX_LEN)

    class Meta:
        unique_together = (('id_from', 'id_to'),)


class NoteDB(models.Model):
    id = models.TextField('id', null=False, max_length=ID_MAX_LEN, primary_key=True)
    name = models.TextField('name', null=False, max_length=100)

    body = models.TextField('body')

    tags = models.ManyToManyField(NoteTag)

    links = models.ManyToManyField(NoteLink)


def create_new_tag(tag_name: str) -> Optional[NoteTag]:
    try:
        tag_obj = NoteTag(tag_name=tag_name)
        tag_obj.save()
        return tag_obj
    except:
        return None


def get_link(id_from: str, id_to: str) -> NoteLink:
    link_obj = NoteLink.objects.filter(id_from=id_from, id_to=id_to).first()

    if link_obj is not None:
        return link_obj

    link_obj = NoteLink(id_from=id_from, id_to=id_to)
    link_obj.save()

    return link_obj
