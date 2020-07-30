import json
import os
from typing import Union, List, Dict, Optional, Iterator

from django.http import HttpResponse

from api import NOTE_DIR


def iterate_over_notes_files() -> Iterator[str]:
    for file in os.listdir(NOTE_DIR):
        if file.startswith('note'):
            yield os.path.join(NOTE_DIR, file)


def createHTTPResponseOK(content: Optional[Union[List, Dict]] = None) -> HttpResponse:
    response = HttpResponse()
    if content is not None:
        response.content = json.dumps(content)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Headers"] = "*"
    response.status_code = 200
    return response


def createHTTPResponseBAD(msg: Optional[str] = None) -> HttpResponse:
    response = HttpResponse()
    if msg is not None:
        response.content = json.dumps({"msg": msg})
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Headers"] = "*"
    response.status_code = 400
    return response
