from django.urls import re_path, path

from api.note_list import note_list
from api.note_update import *

urlpatterns = [
    path('note_list', note_list),
    path('create_note/<str:note_id>', create_note),
    path('update_note/<str:note_id>/name/<str:name>', update_name),
    path('get_note/<str:note_id>', get_note),

    # tags
    path('update_note/<str:note_id>/add_tag/<str:tag>', add_tag),
    path('update_note/<str:note_id>/del_tag/<str:tag>', del_tag),

    # links
    path('update_note/<str:note_id>/add_link/<str:link>', add_link),
    path('update_note/<str:note_id>/del_link/<str:link>', del_link),

    # body
    path('update_note/<str:note_id>/body', update_body),
]
