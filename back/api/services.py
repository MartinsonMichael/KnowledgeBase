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

    def service_getTestList(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: Test = Test.from_bytes(request.body)
        except:
            return HttpResponse(
                content='error while parsing request',
                status=400,
            )

        try:
            self.getTestList(input_data)
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            status=200,
        )

    def getTestList(self, input_data: Test) -> None:
        raise NotImplemented


    def service_getComplexByComplex(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            input_data: Complex = Complex.from_bytes(request.body)
        except:
            return HttpResponse(
                content='error while parsing request',
                status=400,
            )

        try:
            output_data: Complex = self.getComplexByComplex(input_data)
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            content=output_data.to_bytes(),
            status=200,
        )

    def getComplexByComplex(self, input_data: Complex) -> Complex:
        raise NotImplemented


    def service_getBasicComplex(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            output_data: Complex = self.getBasicComplex()
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            content=output_data.to_bytes(),
            status=200,
        )

    def getBasicComplex(self) -> Complex:
        raise NotImplemented


    def service_changeMisterPresident(self, request: HttpRequest, **kwargs) -> HttpResponse:
        try:
            self.changeMisterPresident()
        except:
            return HttpResponse(
                content='error while processing request',
                status=400,
            )

        return HttpResponse(
            status=200,
        )

    def changeMisterPresident(self) -> None:
        raise NotImplemented


