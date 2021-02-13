from django.http import HttpResponse

from api.utils import createHTTPResponseOK


def filter_notes(request, **kwargs) -> HttpResponse:
    return createHTTPResponseOK()
