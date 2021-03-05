import io
import os
import time
import zipfile

from api.models import NoteDB, NoteTag
from .service_BackupService import AbstractBackupService
from .generated_messages import *


class BackupService(AbstractBackupService):

    def applyBackup(self, input_data: BackupRestoreRequest) -> BackupRestoreResponse:
        if input_data.merge_policy not in ['recreate', 'latest_by_name']:
            raise ValueError(f"incorrect merge policy")

        folder_path = os.path.join('/', 'tmp', 'kb_backup_uploaded', str(time.time()))
        with zipfile.ZipFile(io.BytesIO(bytes(input_data.zip_body))) as zip_ref:
            zip_ref.extractall(folder_path)

        NoteTag.objects.all().delete()
        NoteDB.objects.all().delete()

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

        return BackupRestoreResponse(
            -1, -1, -1, -1, -1, -1,
        )
