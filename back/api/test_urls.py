# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)
import os
import numpy as np

from django.http import HttpRequest, HttpResponse
from django.urls import path

from api.models import NoteDB, NoteTag


def loadNotes(request: HttpRequest, **kwargs) -> HttpResponse:

    FILE_STORAGE = os.path.join("/", "data", "KnowledgeBase")

    all_tags = set()

    NoteTag.objects.all().delete()
    NoteDB.objects.all().delete()

    for file_path in os.listdir(FILE_STORAGE):
        if file_path.endswith('.txt'):
            with open(os.path.join(FILE_STORAGE, file_path), "r") as file:
                lines = file.readlines()
                name, tags, body = lines[0], lines[1], lines[2:]

                name = name.replace("\n", "")
                if name[-1] == '.':
                    name = name[:-1]

                tags = [x.replace(" ", "").replace("\n", "") for x in tags.split(";")]
                tags = [x[1:] if x[0] == '#' else x for x in tags if len(x) > 1]

                tag_objs = []

                for tag in tags:
                    tag_obj = NoteTag.objects.filter(title=tag).first()
                    if tag_obj is None:
                        tag_obj = NoteTag(
                            title=tag,
                            color="",
                            description="",
                        )
                        tag_obj.save()
                        print(f"Add new tag: |{tag}|\n")
                        tag_objs.append(tag_obj)

                note = NoteDB(
                    title=name,
                    body="\n".join([x.replace("\n", "") for x in body]),
                )
                note.save()
                for tag_obj in tag_objs:
                    note.tags.add(tag_obj)
                note.save()
                print(f"Add new note: |{name}|\n")

    note_ids = NoteDB.objects.values('note_id')
    for note_id in note_ids:
        note_obj: NoteDB = NoteDB.objects.filter(note_id=note_id['note_id']).first()
        note_linked_objs = NoteDB.objects.filter(note_id__in=np.random.choice([x['note_id'] for x in note_ids], 3))

        print(f"add to {note_id['note_id']} -> ", end='')
        for note in note_linked_objs:
            note_obj.links.add(note)
            print(note.note_id, " ", end='')
        print("\n")

    return HttpResponse(content="OK!")


urlpatterns = [
    path('loadNotes', loadNotes),
]
