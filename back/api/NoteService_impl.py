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
            .annotate(
                tag_ids=ArrayAgg("tags__tag_id"),
                tag_titles=ArrayAgg("tags__title"),
                tag_colors=ArrayAgg("tags__color"),
            )
            .first()
        )
        if note_obj is None:
            raise ValueError(f"No note with id `{input_data.note_id}`")

        note_links = (
            NoteDB
            .objects
            .filter(note_id=int(input_data.note_id))
            .values('note_id')
            .annotate(
                link_ids=ArrayAgg("links__note_id"),
            )
            .first()
        )

        note_link_objs = (
            NoteDB
            .objects
            .filter(note_id__in=note_links['link_ids'])
            .values('note_id', 'title')
            .annotate(
                tag_ids=ArrayAgg("tags__tag_id"),
                tag_titles=ArrayAgg("tags__title"),
                tag_colors=ArrayAgg("tags__color"),
            )
        )

        return Note(
            note_id=note_obj['note_id'],
            name=note_obj['title'],
            body=note_obj['body'],
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
                        in zip(note_link['tag_ids'], note_link['tag_titles'], note_link['tag_colors'])
                    ],
                )
                for note_link in note_link_objs
            ],

        )

    def addNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        note_obj: NoteDB = NoteDB.objects.filter(note_id=input_data.note_id).first()
        if note_obj is None:
            raise ValueError(f"No note with id `{input_data.note_id}`")
        tags_already = [x for x in note_obj.tags.iterator() if int(x.tag_id) == int(input_data.tag_id)]
        if len(tags_already) != 0:
            return NoteUpdateResponse(
                success=True,
                msg="Already has this tag",
                updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
            )
        tag: NoteTag = NoteTag.objects.filter(tag_id=input_data.tag_id).first()
        if tag is None:
            raise ValueError(f"No tag with id `{input_data.tag_id}`")
        note_obj.tags.add(tag)
        note_obj.save()
        return NoteUpdateResponse(
            success=True,
            msg="Tag added",
            updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
        )

    def delNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        note_obj: NoteDB = NoteDB.objects.filter(note_id=input_data.note_id).first()
        if note_obj is None:
            raise ValueError(f"No note with id `{input_data.note_id}`")
        tags_already = [x for x in note_obj.tags.iterator() if int(x.tag_id) == int(input_data.tag_id)]
        if len(tags_already) == 0:
            return NoteUpdateResponse(
                success=True,
                msg="Already hasn't this tag",
                updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
            )
        for tag_obj in tags_already:
            note_obj.tags.remove(tag_obj)
        note_obj.save()
        return NoteUpdateResponse(
            success=True,
            msg="Tag deleted",
            updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
        )

    def addNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        note_obj: NoteDB = NoteDB.objects.filter(note_id=input_data.note_id).first()
        if note_obj is None:
            raise ValueError(f"No note with id `{input_data.note_id}`")
        link_already = [int(x) for x in note_obj.links.iterator() if int(x.note_id) == int(input_data.link_note_id)]
        if len(link_already) != 0:
            return NoteUpdateResponse(
                success=True,
                msg="Already has this link",
                updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
            )
        note_link_obj: NoteDB = NoteDB.objects.filter(note_id=input_data.link_note_id).first()
        if note_link_obj is None:
            raise ValueError(f"No such linked note with id `{input_data.link_note_id}`")
        note_obj.links.add(note_link_obj)
        note_obj.save()
        return NoteUpdateResponse(
            success=True,
            msg="Link added",
            updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
        )

    def delNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        note_obj: NoteDB = NoteDB.objects.filter(note_id=input_data.note_id).first()
        if note_obj is None:
            raise ValueError(f"No note with id `{input_data.note_id}`")
        obj_to_del = [x for x in note_obj.links.iterator() if int(x.note_id) == int(input_data.link_note_id)]
        if len(obj_to_del) == 0:
            return NoteUpdateResponse(
                success=True,
                msg="Already hasn't this link",
                updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
            )
        for obj in obj_to_del:
            note_obj.links.remove(obj)
        note_obj.save()
        return NoteUpdateResponse(
            success=True,
            msg="Link deleted",
            updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
        )

    def updateNoteName(self, input_data: NoteNameUpdate) -> NoteUpdateResponse:
        note_obj: NoteDB = NoteDB.objects.filter(note_id=input_data.note_id).first()
        if note_obj is None:
            raise ValueError(f"No note with id={input_data.note_id}")
        note_obj.title = input_data.new_name
        note_obj.save()
        return NoteUpdateResponse(
            success=True,
            msg="Title changed",
            updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
        )

    def updateNoteBody(self, input_data: NoteBodyUpdate) -> NoteUpdateResponse:
        note_obj: NoteDB = NoteDB.objects.filter(note_id=input_data.note_id).first()
        if note_obj is None:
            raise ValueError(f"No note with id={input_data.note_id}")
        note_obj.body = input_data.new_body
        note_obj.save()
        return NoteUpdateResponse(
            success=True,
            msg="Body updated",
            updatedNote=self.getNote(NoteRequest(note_id=note_obj.note_id)),
        )

