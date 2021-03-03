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
    
    
class AbstractTestService:

    @csrf_exempt
    def service_getSimpleMsg(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            output_data: SimpleMsg = self.getSimpleMsg()
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def getSimpleMsg(self) -> SimpleMsg:
        raise NotImplemented

    @csrf_exempt
    def service_getComplexMsg(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            output_data: ComplexMsg = self.getComplexMsg()
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def getComplexMsg(self) -> ComplexMsg:
        raise NotImplemented

    @csrf_exempt
    def service_getComplexBySimple(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: SimpleMsg = SimpleMsg.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: ComplexMsg = self.getComplexBySimple(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def getComplexBySimple(self, input_data: SimpleMsg) -> ComplexMsg:
        raise NotImplemented

    @csrf_exempt
    def service_postComplex(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: ComplexMsg = ComplexMsg.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            self.postComplex(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response()

    def postComplex(self, input_data: ComplexMsg) -> None:
        raise NotImplemented

    @csrf_exempt
    def service_postNull(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            self.postNull()
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response()

    def postNull(self) -> None:
        raise NotImplemented


