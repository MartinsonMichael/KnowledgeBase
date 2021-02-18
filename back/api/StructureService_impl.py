from django.contrib.postgres.aggregates import ArrayAgg

from api.models import NoteTag, NoteDB
from .services import AbstractStructureService
from .generated_messages import *


class StructureService(AbstractStructureService):

    def getStructure(self) -> Structure:
        return Structure(
            tag_store=TagStore(
                tags={
                    tag.tag_id: Tag(id=tag.tag_id, name=tag.title, description=tag.description, color=tag.color)
                    for tag in NoteTag.objects.all()
                },
            ),
            head_store=NoteHeadStore(
                heads={
                    note['note_id']: NoteHead(
                        id=note['note_id'],
                        name=note['title'],
                        tags=note['tags'],
                        links=[x for x in note['links'] if x is not None and x != ""],
                    )
                    for note in (
                        NoteDB.objects
                        .values("note_id", "title")
                        .annotate(
                            tags=ArrayAgg("tags__title"),
                            links=ArrayAgg("links__note_id"),
                        )
                        .all()
                    )
                },
            ),
        )


