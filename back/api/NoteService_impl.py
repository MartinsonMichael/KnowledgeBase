from django.contrib.postgres.aggregates import ArrayAgg

from .services import AbstractNoteService
from .generated_messages import *

from api.models import NoteDB, NoteTag


class NoteService(AbstractNoteService):

    def getNote(self, input_data: NoteRequest) -> Note:
        note_obj = (
            NoteDB
            .objects
            .filter(note_id=input_data.id)
            .values('note_id', 'title', 'body')
            .annotate(
                tags=ArrayAgg("tags__title"),
                links=ArrayAgg("links__note_id"),
            )
            .first()
        )
        if note_obj is None:
            raise ValueError(f"no such note id {input_data.id}")
        return Note(
            id=note_obj['note_id'],
            name=note_obj['title'],
            tags=note_obj['tags'],
            links=[x for x in note_obj['links'] if x is not None and len(x) > 0],
            body=note_obj['body'],
        )

    def addNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def delNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def addNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def delNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def updateNoteName(self, input_data: NoteNameUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def updateNoteBody(self, input_data: NoteBodyUpdate) -> NoteUpdateResponse:
        raise NotImplemented

