import io
import json
import os
import zipfile
import time
from datetime import datetime

from django.contrib.postgres.aggregates import ArrayAgg
from django.http import HttpRequest, HttpResponse, FileResponse
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from api.models import NoteDB, NoteTag


def make_response(content: str = "", status: int = 200) -> HttpResponse:
    response = HttpResponse(content=content, status=status)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Headers"] = "*"
    return response


@csrf_exempt
def downloadBackup(request: HttpRequest, **kwargs) -> FileResponse:
    zip_file_path = make_backup()
    response = FileResponse(open(zip_file_path, 'rb'))
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Headers"] = "*"
    return response


@csrf_exempt
def restoreFromBackup(request: HttpRequest, **kwargs) -> HttpResponse:
    if request.method == 'OPTIONS':
        return make_response()

    folder_path = os.path.join('/', 'tmp', 'kb_backup_uploaded', str(time.time()))
    with zipfile.ZipFile(io.BytesIO(request.body)) as zip_ref:
        zip_ref.extractall(folder_path)

    restore_from_backup(folder_path)

    return make_response("OK")


def make_backup() -> str:
    """
    this function make zim file with all notes and tags
    :return: zip file with a lot of txt json files, one for each note + one for tags info
    """
    folder_name = os.path.join('/', 'tmp', 'kb_backup', str(time.time()))
    note_obj_list = (
        NoteDB
        .objects
        .values('note_id', 'title', 'body', 'last_update')
        .annotate(
            tag_ids=ArrayAgg("tags__tag_id"),
            links_ids=ArrayAgg("links__note_id"),
        )
    )
    os.makedirs(folder_name)
    for note_obj in note_obj_list:
        file_name = f"{note_obj['note_id']}__{'_'.join(note_obj['title'].split(' '))}"
        with open(os.path.join(folder_name, file_name), 'w') as file:
            file.write(json.dumps(
                {
                    'note_id': note_obj['note_id'],
                    'title': note_obj['title'],
                    'last_update': note_obj['last_update'].strftime("%m/%d/%Y, %H:%M:%S"),
                    'tags': list(set([tag_id for tag_id in note_obj['tag_ids'] if tag_id is not None])),
                    'links': list(set([link_id for link_id in note_obj['links_ids'] if link_id is not None])),
                    'body': note_obj['body'],
                },
                indent=4,
            ))
    tag_obj_list = NoteTag.objects.values('tag_id', 'title', 'description', 'color', 'last_update').all()
    with open(os.path.join(folder_name, 'TAGS'), 'w') as file:
        file.write(json.dumps(
            [
                {
                    'tag_id': tag_obj['tag_id'],
                    'title': tag_obj['title'],
                    'last_update': tag_obj['last_update'].strftime("%m/%d/%Y, %H:%M:%S"),
                    'description': tag_obj['description'],
                    'color': tag_obj['color'],
                }
                for tag_obj in tag_obj_list
            ],
            indent=4,
        ))

    def zipdir(path, ziph):
        for root, dirs, files in os.walk(path):
            for file in files:
                ziph.write(os.path.join(root, file),
                           os.path.relpath(os.path.join(root, file), os.path.join(path, '..')))

    zip_file_name = f"kb_backup_{datetime.now().year}_{datetime.now().month}_{datetime.now().day}.zip"
    zipf = zipfile.ZipFile(os.path.join('/', 'tmp', 'kb_backup', zip_file_name), 'w', zipfile.ZIP_DEFLATED)
    zipdir(folder_name, zipf)
    zipf.close()

    return os.path.join('/', 'tmp', 'kb_backup', zip_file_name)


def restore_from_backup(folder_path: str) -> None:
    tag_map = dict()
    note_map = dict()
    note_json_list = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file == "TAGS":
                tags = json.load(open(os.path.join(root, file), 'r'))
                for tag in tags:
                    tag_obj = NoteTag(
                        title=tag['title'],
                        description=tag['description'],
                        color=tag['color'],
                    )
                    tag_obj.save()
                    tag_map[tag['tag_id']] = tag_obj
            else:
                note_json = json.load(open(os.path.join(root, file), 'r'))
                note_obj = NoteDB(
                    title=note_json['title'],
                    body=note_json['body'],
                )
                note_obj.save()
                note_map[note_json['note_id']] = note_obj
                note_json_list.append(note_json)

    for note_json in note_json_list:
        for tag_id in note_json['tags']:
            note_map[note_json['note_id']].tags.add(tag_map[tag_id])
        for link_id in note_json['links']:
            note_map[note_json['note_id']].links.add(note_map[link_id])
        note_map[note_json['note_id']].save()

    if NoteTag.objects.count() == 0:
        NoteTag(title='test').save()


urlpatterns = [
    path('makeBackup', downloadBackup),
    path('restoreFromBackup', restoreFromBackup),
]
