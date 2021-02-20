from django.contrib.auth.models import AbstractUser
from django.db import models


class NoteTag(models.Model):
    tag_id = models.AutoField(primary_key=True, auto_created=True)

    title = models.TextField(unique=True)
    color = models.TextField(default="")
    description = models.TextField(default="")


class NoteDB(models.Model):
    note_id = models.AutoField(primary_key=True, auto_created=True)

    title = models.TextField(unique=True)

    body = models.TextField(default="")

    tags = models.ManyToManyField('NoteTag', db_index=False)
    links = models.ManyToManyField('NoteDB', db_index=False)


class KbUser(models.Model):
    user_id = models.AutoField(primary_key=True, auto_created=True)
