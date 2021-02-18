# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)
import os

from django.http import HttpRequest, HttpResponse
from django.urls import path

from api.models import NoteDB, NoteTag


def loadNotes(request: HttpRequest, **kwargs) -> HttpResponse:

    FILE_STORAGE = os.path.join("/", "data", "KnowledgeBase")

    all_tags = set()

    for file_path in os.listdir(FILE_STORAGE):
        if file_path.endswith('.txt'):
            with open(os.path.join(FILE_STORAGE, file_path), "r") as file:
                lines = file.readlines()
                name, tags, body = lines[0], lines[1], lines[2:]

                name = name.replace("\n", "")
                if name[-1] == '.':
                    name = name[:-1]

                tags = [x.replace(" ", "").replace("\n", "") for x in tags.split(";") if len(x) > 1]
                tags = [x[1:] if x[0] == '#' else x for x in tags]

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

    return HttpResponse(content="OK!")


urlpatterns = [
    path('loadNotes', loadNotes),
]
