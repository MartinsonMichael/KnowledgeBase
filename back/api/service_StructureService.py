# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)

import json
from django.views.decorators.csrf import csrf_exempt
from typing import List, Dict
from django.http import HttpResponse, HttpRequest

from .generated_messages import *
 

def make_response(content: str = "", status: int = 200) -> HttpResponse:
    response = HttpResponse(content=content, status=status)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Headers"] = "*"
    return response
    
    
class AbstractStructureService:

    @csrf_exempt
    def service_getStructure(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            output_data: Structure = self.getStructure()
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def getStructure(self) -> Structure:
        raise NotImplemented

    @csrf_exempt
    def service_createNewTag(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: TagCreateRequest = TagCreateRequest.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: TagStore = self.createNewTag(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def createNewTag(self, input_data: TagCreateRequest) -> TagStore:
        raise NotImplemented

    @csrf_exempt
    def service_createNewNote(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: NewNote = NewNote.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: NewNoteResponse = self.createNewNote(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def createNewNote(self, input_data: NewNote) -> NewNoteResponse:
        raise NotImplemented

    @csrf_exempt
    def service_updateTag(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: Tag = Tag.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: Tag = self.updateTag(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def updateTag(self, input_data: Tag) -> Tag:
        raise NotImplemented


