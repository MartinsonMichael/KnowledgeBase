from typing import Optional

from django.db import models

ID_MAX_LEN = 50


class NoteTag(models.Model):
    tag_name = models.TextField('name', null=False, max_length=20, primary_key=True)
    tag_color = models.TextField('color', max_length=10, null=True)
    tag_description = models.TextField('description', max_length=100, null=True)


class NoteLink(models.Model):
    id_from = models.TextField('id_from', null=False, max_length=ID_MAX_LEN)
    id_to = models.TextField('id_to', null=False, max_length=ID_MAX_LEN)
    link_type = models.TextField('link_type', max_length=20)

    class Meta:
        unique_together = (('id_from', 'id_to', 'link_type'),)


class NoteDB(models.Model):
    id = models.TextField('id', null=False, max_length=ID_MAX_LEN, primary_key=True)
    name = models.TextField('name', null=False, max_length=100)

    body = models.TextField('body')

    tags = models.ManyToManyField(NoteTag)

    links = models.ManyToManyField(NoteLink, related_name="forward_links")
    back_links = models.ManyToManyField(NoteLink, related_name="back_links")


def create_new_tag(tag_name: str) -> Optional[NoteTag]:
    try:
        tag_obj = NoteTag(tag_name=tag_name)
        tag_obj.save()
        return tag_obj
    except:
        return None


def get_or_create_link(id_from: str, id_to: str, link_type: Optional[str] = None) -> NoteLink:
    if link_type is None:
        link_type = "normal"

    link_obj = NoteLink.objects.filter(id_from=id_from, id_to=id_to, link_type=link_type).first()

    if link_obj is not None:
        return link_obj

    link_obj = NoteLink(id_from=id_from, id_to=id_to, link_type=link_type)
    link_obj.save()

    return link_obj


class AttributeTable(models.Model):
    key = models.TextField('key', max_length=20, null=False, primary_key=True)
    value = models.TextField('value', max_length=250, null=True)
