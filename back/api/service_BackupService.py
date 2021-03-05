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
    
    
class AbstractBackupService:

    @csrf_exempt
    def service_applyBackup(self, request: HttpRequest, **kwargs) -> HttpResponse:
        if request.method == 'OPTIONS':
            return make_response()
        try:
            input_data: BackupRestoreRequest = BackupRestoreRequest.from_json(json.loads(request.body))
        except Exception as e:
            return make_response(f"error while parsing request:\n{str(e)}", 400)
        try:
            output_data: BackupRestoreResponse = self.applyBackup(input_data)
        except ValueError as e:
            return make_response(str(e), 400)
        except Exception as e:
            return make_response(f"error while processing request:\n{str(e)}", 400)

        return make_response(
            content=json.dumps(output_data.to_json()),
            status=200,
        )

    def applyBackup(self, input_data: BackupRestoreRequest) -> BackupRestoreResponse:
        raise NotImplemented


