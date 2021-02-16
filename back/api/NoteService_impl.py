from .services import AbstractNoteService
from .generated_messages import *


class NoteService(AbstractNoteService):

    def getNotes(self, input_data: NoteRequest) -> Note:
        raise NotImplemented

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

