import json
from typing import Union, List, Dict, Optional

from django.http import HttpResponse


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
