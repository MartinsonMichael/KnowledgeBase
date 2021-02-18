# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)

import json
from typing import List, Dict
from django.http import HttpResponse, HttpRequest

from .generated_messages import *
 

class AbstractStructureService:

    def service_getStructure(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            output_data: Structure = self.getStructure()
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def getStructure(self) -> Structure:
        raise NotImplemented

    def service_createNewTag(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: TagCreateRequest = TagCreateRequest.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: Tag = self.createNewTag(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def createNewTag(self, input_data: TagCreateRequest) -> Tag:
        raise NotImplemented

    def service_updateTag(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: Tag = Tag.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: Tag = self.updateTag(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def updateTag(self, input_data: Tag) -> Tag:
        raise NotImplemented


class AbstractNoteService:

    def service_getNote(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NoteRequest = NoteRequest.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: Note = self.getNote(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def getNote(self, input_data: NoteRequest) -> Note:
        raise NotImplemented

    def service_createNewNote(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NewNote = NewNote.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: NoteUpdateResponse = self.createNewNote(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def createNewNote(self, input_data: NewNote) -> NoteUpdateResponse:
        raise NotImplemented

    def service_addNoteTag(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NoteTagUpdate = NoteTagUpdate.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: NoteUpdateResponse = self.addNoteTag(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def addNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def service_delNoteTag(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NoteTagUpdate = NoteTagUpdate.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: NoteUpdateResponse = self.delNoteTag(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def delNoteTag(self, input_data: NoteTagUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def service_addNoteLink(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NoteLinkUpdate = NoteLinkUpdate.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: NoteUpdateResponse = self.addNoteLink(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def addNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def service_delNoteLink(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NoteLinkUpdate = NoteLinkUpdate.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: NoteUpdateResponse = self.delNoteLink(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def delNoteLink(self, input_data: NoteLinkUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def service_updateNoteName(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NoteNameUpdate = NoteNameUpdate.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: NoteUpdateResponse = self.updateNoteName(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def updateNoteName(self, input_data: NoteNameUpdate) -> NoteUpdateResponse:
        raise NotImplemented

    def service_updateNoteBody(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NoteBodyUpdate = NoteBodyUpdate.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: NoteUpdateResponse = self.updateNoteBody(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def updateNoteBody(self, input_data: NoteBodyUpdate) -> NoteUpdateResponse:
        raise NotImplemented


class AbstractTestService:

    def service_getSimpleMsg(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            output_data: SimpleMsg = self.getSimpleMsg()
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def getSimpleMsg(self) -> SimpleMsg:
        raise NotImplemented

    def service_getComplexMsg(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            output_data: ComplexMsg = self.getComplexMsg()
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def getComplexMsg(self) -> ComplexMsg:
        raise NotImplemented

    def service_getComplexBySimple(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: SimpleMsg = SimpleMsg.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            output_data: ComplexMsg = self.getComplexBySimple(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response = HttpResponse(
            content=json.dumps(output_data.to_json()),
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def getComplexBySimple(self, input_data: SimpleMsg) -> ComplexMsg:
        raise NotImplemented

    def service_postComplex(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: ComplexMsg = ComplexMsg.from_json(json.loads(request.body))
        except:
            response = HttpResponse(
                content='error while parsing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response
        try:
            self.postComplex(input_data)
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response =HttpResponse(
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def postComplex(self, input_data: ComplexMsg) -> None:
        raise NotImplemented

    def service_postNull(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            self.postNull()
        except:
            response = HttpResponse(
                content='error while processing request',
                status=400,
            )
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        response =HttpResponse(
            status=200,
        )
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        return response

    def postNull(self) -> None:
        raise NotImplemented


