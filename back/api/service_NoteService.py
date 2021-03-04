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
    
    
class AbstractNoteService:

    @csrf_exempt
    def service_getNote(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: NoteRequest = NoteRequest.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: Note = self.getNote(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def getNote(self, input_data: NoteRequest) -> Note:
        raise NotImplemented

    @csrf_exempt
    def service_addNoteTag(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: NoteTagUpdate = NoteTagUpdate.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: NoteUpdateResponse = self.addNoteTag(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def addNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    @csrf_exempt
    def service_delNoteTag(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: NoteTagUpdate = NoteTagUpdate.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: NoteUpdateResponse = self.delNoteTag(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def delNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    @csrf_exempt
    def service_addNoteLink(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: NoteLinkUpdate = NoteLinkUpdate.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: NoteUpdateResponse = self.addNoteLink(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def addNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    @csrf_exempt
    def service_delNoteLink(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: NoteLinkUpdate = NoteLinkUpdate.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: NoteUpdateResponse = self.delNoteLink(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def delNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    @csrf_exempt
    def service_updateNoteName(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: NoteNameUpdate = NoteNameUpdate.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: NoteUpdateResponse = self.updateNoteName(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def updateNoteName(self, input_data: NoteNameUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    @csrf_exempt
    def service_updateNoteBody(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: NoteBodyUpdate = NoteBodyUpdate.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: NoteUpdateResponse = self.updateNoteBody(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def updateNoteBody(self, input_data: NoteBodyUpdate) -> NoteUpdateResponse:
        raise NotImplemented


