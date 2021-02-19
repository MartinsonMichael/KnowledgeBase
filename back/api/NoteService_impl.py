from django.contrib.postgres.aggregates import ArrayAgg

from .services import AbstractNoteService
from .generated_messages import *

from api.models import NoteDB, NoteTag


class NoteService(AbstractNoteService):

    def getNote(self, input_data: NoteRequest) -> Note:
        note_obj = (
            NoteDB
            .objects
            .filter(note_id=int(input_data.note_id))
            .values('note_id', 'title', 'body')
            .order_by("note_id", "links__note_id", "tags__tag_id")
            .annotate(
                tag_ids=ArrayAgg("tags__tag_id"),
                tag_titles=ArrayAgg("tags__title"),
                tag_colors=ArrayAgg("tags__color"),

                link_ids=ArrayAgg("links__note_id"),
            )
            .first()
        )
        if note_obj is None:
            raise ValueError(f"no such note with id={input_data.note_id}")

        print(note_obj['link_ids'])

        note_link_obj = (
            NoteDB
            .objects
            .filter(note_id__in=note_obj['link_ids'])
            .values('note_id', 'title')
            .order_by("note_id", "links__note_id", "tags__tag_id")
            .annotate(
                tag_ids=ArrayAgg("tags__tag_id"),
                tag_titles=ArrayAgg("tags__title"),
                tag_colors=ArrayAgg("tags__color"),

                link_ids=ArrayAgg("links__note_id"),
            )
        )
        print(note_link_obj)

        if note_obj is None:
            raise ValueError(f"no such note id {input_data.id}")
        return Note(
            note_id=note_obj['note_id'],
            name=note_obj['title'],
            tags=[
                TagHead(tag_id=tag_id, name=tag_name, color=tag_color)
                for tag_id, tag_name, tag_color
                in zip(note_obj['tag_ids'], note_obj['tag_titles'], note_obj['tag_colors'])
            ],
            links=[
                NoteHead(
                    note_id=note_link['note_id'],
                    name=note_link['title'],
                    tags=[
                        TagHead(tag_id=tag_id, name=tag_name, color=tag_color)
                        for tag_id, tag_name, tag_color
                        in zip(note_obj['tag_ids'], note_obj['tag_titles'], note_obj['tag_colors'])
                    ],
                )
                for note_link in note_link_obj
            ],
            body=note_obj['body'],
        )

    def addNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        note_obj: NoteDB = NoteDB.object.filter(note_id=input_data.note_id).firts()
        if note_obj is None:
            raise ValueError(f"no such note with id {input_data.note_id}")
        tag: NoteTag = NoteTag.obkects.filter(tag_title=input_data.tag_name).firts()
        if tag is None:
            raise ValueError(f"no such tag with name {input_data.tag_name}")
        note_obj.tags.add(tag)
        note_obj.save()

    def delNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        note_obj: NoteDB = NoteDB.object.filter(note_id=input_data.note_id).firts()
        if note_obj is None:
            raise ValueError(f"no such note with id {input_data.note_id}")
        tag: NoteTag = NoteTag.obkects.filter(tag_title=input_data.tag_name).firts()
        if tag is None:
            raise ValueError(f"no such tag with name {input_data.tag_name}")
        note_obj.tags.remove(tag)
        note_obj.save()

    def addNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def delNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def updateNoteName(self, input_data: NoteNameUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def updateNoteBody(self, input_data: NoteBodyUpdate) -> NoteUpdateResponse:
        raise NotImplemented

