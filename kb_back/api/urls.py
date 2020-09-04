from django.urls import re_path, path

from api.graph_structure_api import get_graph_structure
from api.note_list import note_list
from api.tag_list import tag_list
from api.filter_notes import filter_notes
from api.note_update import *
from api.tag_actions import update_tag_color, update_tag_description, update_tag, create_new_tag

urlpatterns = [
    path('get_structure', get_graph_structure),
    path('filter_notes', filter_notes),

    path('create_note/<str:note_id>/<str:note_name>', create_note),
    path('get_note/<str:note_id>', get_note),

    # NoteUpdate
    path('update_note/<str:note_id>/full', update_note),
    path('update_note/<str:note_id>/name/<str:name>', update_name),
    # tags
    path('tag_list', tag_list),
    path('update_note/<str:note_id>/add_tag/<str:tag>', add_tag),
    path('update_note/<str:note_id>/del_tag/<str:tag>', del_tag),

    # links
    path('update_note/<str:note_id>/add_link/<str:link>', add_link),
    path('update_note/<str:note_id>/del_link/<str:link>', del_link),

    # body
    path('update_note/<str:note_id>/body', update_body),

    # tag
    path('create_tag/<str:tag_name>', create_new_tag),
    path('update_tag/<str:tag_name>', update_tag),
    path('update_tag_description/<str:tag_name>/<str:new_tag_description>', update_tag_description),
    path('update_tag_color/<str:tag_name>/<str:new_tag_color>', update_tag_color),
]
