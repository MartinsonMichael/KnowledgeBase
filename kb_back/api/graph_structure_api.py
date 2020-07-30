from django.contrib.postgres.aggregates import ArrayAgg
from django.http import HttpResponse

from api.models import NoteDB, NoteTag
from api.utils import createHTTPResponseOK


def get_graph_structure(request, **kwargs) -> HttpResponse:
    # sent Dict[str - note id : "tags", "links", "name"

    tag_list = NoteTag.objects.all().values('tag_name', 'tag_color')

    note_attributes = (
        NoteDB.objects
        .values('name', 'id')
        .annotate(
            tags=ArrayAgg('tags'),
            links=ArrayAgg('links__id_to'),
        )
    )

    return createHTTPResponseOK({
        'tag_list': list(tag_list),
        'note_head': [
            {
                'id': note_dict['id'],
                'name': note_dict['name'],
                'tags': note_dict['tags'],
                'links': [x for x in note_dict['links'] if x is not None],
            }
            for note_dict in note_attributes
        ]
    })
