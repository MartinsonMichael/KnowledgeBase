from django.contrib.postgres.aggregates import ArrayAgg

from api.models import NoteTag, NoteDB
from .services import AbstractStructureService
from .generated_messages import *


class StructureService(AbstractStructureService):

    def getStructure(self) -> Structure:
        return Structure(
            tag_store=TagStore(
                tags={
                    tag.title: TagHead(tag_id=tag.tag_id, name=tag.title, color=tag.color)
                    for tag in NoteTag.objects.all()
                },
            ),
            head_store=NoteHeadStore(
                heads={
                    note['note_id']: NoteHead(
                        note_id=note['note_id'],
                        name=note['title'],
                        tags=[
                            TagHead(tag_id=tag_id, name=tag_name, color=tag_color)
                            for tag_id, tag_name, tag_color
                            in zip(note['tag_ids'], note['tag_titles'], note['tag_colors'])
                        ],
                    )
                    for note in (
                        NoteDB.objects
                        .values("note_id", "title")
                        .annotate(
                            tag_ids=ArrayAgg("tags__tag_id"),
                            tag_titles=ArrayAgg("tags__title"),
                            tag_colors=ArrayAgg("tags__color"),
                        )
                        .all()
                    )
                },
            ),
        )

    def createNewTag(self, input_data: TagCreateRequest) -> Tag:
        tag: NoteTag = NoteTag(
            title=input_data.name,
        )
        tag.save()
        note_obj: NoteDB = NoteDB.object.filter(note_id=input_data.add_to_note_id).first()
        if note_obj is not None:
            note_obj.tags.add(tag)
            note_obj.save()
        return Tag(
            id=tag.tag_id,
            name=tag.title,
            description=tag.description,
            color=tag.color,
        )

    def updateTag(self, input_data: Tag) -> Tag:
        tag: NoteTag = NoteTag.objects.filter(tag_id=input_data.tag_id).first()
        if tag is None:
            raise ValueError(f"no such tag: id={input_data.tag_id}")
        tag.title = input_data.name
        tag.description = input_data.description
        tag.color = input_data.color
        tag.save()

        return Tag(
            tag_id=tag.tag_id,
            name=tag.title,
            description=tag.description,
            color=tag.color,
        )

