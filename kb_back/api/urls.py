from django.urls import path

from api.api_test import api_test
from api.graph_structure_api import get_graph_structure
from api.filter_notes import filter_notes
from api.note_api import *
from api.tag_api import *
from api.attribute_api import *

urlpatterns = [
    # test
    path('test', api_test),

    # filter & structure
    path('get_structure', get_graph_structure),
    path('filter_notes', filter_notes),
    path('create_index_page_for_tag', create_index_note_for_teg),

    # Note
    path('update_note/<str:note_id>/full', update_note),
    path('create_note/<str:note_id>/<str:note_name>', create_note),
    path('get_note/<str:note_id>', get_note),

    # tag
    path('create_tag/<str:tag_name>', create_new_tag),
    path('update_tag/<str:tag_name>', update_tag),

    # attributes
    path('set_attribute/<str:key>/<str:value>', set_attribute_value),
    path('get_attribute/<str:key>', get_attribute_value),
]
