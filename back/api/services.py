# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)

import json
from typing import List
from django.http import HttpResponse, HttpRequest

from .generated_messages import *
 

class AbstractNoteService:

    def service_getStructure(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            output_data: Structure = self.getStructure()
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            content=output_data.to_bytes(),
            status=200,
        )

    def getStructure(self) -> Structure:
        raise NotImplemented

    def service_getNotesHeaderList(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            output_data: NoteHeaderList = self.getNotesHeaderList()
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            content=output_data.to_bytes(),
            status=200,
        )

    def getNotesHeaderList(self) -> NoteHeaderList:
        raise NotImplemented

    def service_getNotes(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: NoteID = NoteID.from_bytes(request.body)
        except:
            return HttpResponse(
                content='error while parsing request',
                status=400,
            )

        try:
            output_data: Note = self.getNotes(input_data)
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            content=output_data.to_bytes(),
            status=200,
        )

    def getNotes(self, input_data: NoteID) -> Note:
        raise NotImplemented


class AbstractTestService:

    def service_getSimpleMsg(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            output_data: SimpleMsg = self.getSimpleMsg()
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            content=output_data.to_bytes(),
            status=200,
        )

    def getSimpleMsg(self) -> SimpleMsg:
        raise NotImplemented

    def service_getComplexMsg(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            output_data: ComplexMsg = self.getComplexMsg()
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            content=output_data.to_bytes(),
            status=200,
        )

    def getComplexMsg(self) -> ComplexMsg:
        raise NotImplemented

    def service_getComplexBySimple(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: SimpleMsg = SimpleMsg.from_bytes(request.body)
        except:
            return HttpResponse(
                content='error while parsing request',
                status=400,
            )

        try:
            output_data: ComplexMsg = self.getComplexBySimple(input_data)
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            content=output_data.to_bytes(),
            status=200,
        )

    def getComplexBySimple(self, input_data: SimpleMsg) -> ComplexMsg:
        raise NotImplemented

    def service_postComplex(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: ComplexMsg = ComplexMsg.from_bytes(request.body)
        except:
            return HttpResponse(
                content='error while parsing request',
                status=400,
            )

        try:
            self.postComplex(input_data)
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            status=200,
        )

    def postComplex(self, input_data: ComplexMsg) -> None:
        raise NotImplemented

    def service_postNull(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            self.postNull()
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            status=200,
        )

    def postNull(self) -> None:
        raise NotImplemented


