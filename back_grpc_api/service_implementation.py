from generated.note_pb2_grpc import NoteServiceServicer
from generated.note_pb2 import NoteHeader, NoteHeaderList

from note_tools.iterators import iterate_over_all_notes


class NoteServiceImplemented(NoteServiceServicer):
    def getAllNotesHeaders(self, request, context):
        return NoteHeaderList(list=(
            NoteHeader(id=note.id, name=note.name)
            for note in iterate_over_all_notes()
        ))

    def getAllNotesHeaders2(self, request, context):
        print('HERE')
        return NoteHeaderList(list=(
            NoteHeader(id=note.id, name=note.name)
            for note in iterate_over_all_notes()
        ))
