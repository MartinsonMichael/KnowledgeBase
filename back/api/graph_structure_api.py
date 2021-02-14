from django.http import HttpResponse

from api.models import NoteDB, NoteTag
from api.utils import createHTTPResponseOK


def get_graph_structure(request, **kwargs) -> HttpResponse:
    # sent Dict[str - note id : "tags", "links", "name"

    tag_list = NoteTag.objects.all().values('tag_name', 'tag_color', 'tag_description')

    note_attributes = (
        # NoteDB.objects
        # .values('name', 'id')
        # .annotate(
        #     tags=ArrayAgg('tags'),
        #     links=ArrayAgg('links__id_to'),
        # )
    )

    # home_page = KbUser.objects.filter(key='home_page').values().first()
    # if home_page is not None:
    #     home_page = home_page['value']

    for note_dict in note_attributes:
        if note_dict['id'] == 'study_1599829076.56094':
            print(note_dict)

    return createHTTPResponseOK({
        # 'home_page': home_page,
        'tag_list': list(tag_list),
        'note_head': [
            {
                'id': note_dict['id'],
                'name': note_dict['name'],
                'tags': list(set(note_dict['tags'])),
                'links': list(set([x for x in note_dict['links'] if x is not None])),
            }
            for note_dict in note_attributes
        ]
    })
