from django.contrib.auth.models import AbstractUser
from djongo import models


class NoteTag(models.Model):
    tag_id = models.ObjectIdField()

    title = models.TextField(default="", unique=True)
    color = models.TextField(default="")
    description = models.TextField(default="")

    objects = models.DjongoManager()


class NoteDB(models.Model):
    note_id = models.ObjectIdField()
    title = models.TextField(unique=True, null=True)

    body = models.TextField(default="")

    tags = models.ManyToManyField(NoteTag, db_index=False)
    links = models.ManyToManyField('NoteDB', db_index=False)

    objects = models.DjongoManager()


class KbUser(models.Model):
    user_id = models.ObjectIdField()

    objects = models.DjongoManager()
