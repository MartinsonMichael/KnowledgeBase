from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models


class NoteTag(models.Model):
    tag_id = models.AutoField(primary_key=True, auto_created=True)

    title = models.TextField(unique=True)
    color = models.TextField(default="")
    description = models.TextField(default="")

    last_update = models.DateTimeField(default=datetime.now)


class NoteDB(models.Model):
    note_id = models.AutoField(primary_key=True, auto_created=True)

    title = models.TextField()

    last_update = models.DateTimeField(default=datetime.now)
    body = models.TextField(default="")

    tags = models.ManyToManyField('NoteTag', db_index=False)
    links = models.ManyToManyField('NoteDB', db_index=False)


class KbUser(models.Model):
    user_id = models.AutoField(primary_key=True, auto_created=True)
    name = models.TextField()

    password_hash = models.TextField()
    token_hash = models.TextField()

    last_backup_time = models.DateTimeField()
