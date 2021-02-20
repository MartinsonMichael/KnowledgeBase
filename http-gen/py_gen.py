import logging
import os

from utils import ParseResult, MessageAttribute, _is_base_type

logger = logging.Logger(__name__)

TAB = "    "
HEAD = """# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)"""
MESSAGE_HEAD = f"""{HEAD}

from typing import List, Dict, Union
import json


"""
SERVICE_HEAD = f"""{HEAD}

import json
from django.views.decorators.csrf import csrf_exempt
from typing import List, Dict
from django.http import HttpResponse, HttpRequest

from .generated_messages import *
 

def make_response(content: str = "", status: int = 200) -> HttpResponse:
    response = HttpResponse(content=content, status=status)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Headers"] = "*"
"""


def _base_type_to_py_types(atr_type: str) -> str:
    assert _is_base_type(atr_type), f"Attempt to convert non base type {atr_type} ty py base type"

    if atr_type == "int32":
        return "int"
    elif atr_type == "string":
        return "str"
    elif atr_type == "float":
        return "float"
    elif atr_type == "bool":
        return "bool"
    else:
        ValueError(f"unknown base py type: {atr_type}")


def _make_py_type(atr_type: str) -> str:
    if _is_base_type(atr_type):
        return _base_type_to_py_types(atr_type)
    else:
        return f"'{atr_type}'"


def _make_atr_type(atr: MessageAttribute) -> str:
    if atr.is_map:
        return f"Dict[{_make_py_type(atr.map_key_type)}, {_make_py_type(atr.map_value_type)}]"
    else:
        if atr.repeated:
            return f"List[{_make_py_type(atr.atr_type)}]"
        else:
            return f"{_make_py_type(atr.atr_type)}"


def _make_attribute_declaration(atr: MessageAttribute) -> str:
    return f"{atr.atr_name}: {_make_atr_type(atr)}"


def generate_messages(parse_result: ParseResult, msg_path: str) -> None:
    with open(msg_path, "w") as file:
        file.write(MESSAGE_HEAD)

        for msg in parse_result.messages:
            file.write(f"class {msg.name}:\n")
            if len(msg.attributes) != 0:
                file.write(
                    f"{TAB}def __init__(self, "
                    f"{', '.join([_make_attribute_declaration(atr) for atr in msg.attributes])}):\n"
                )
            else:
                file.write(
                    f"{TAB}def __init__(self):\n"
                    f"{TAB}{TAB}pass\n"
                )
            for atr in msg.attributes:
                file.write(f"{TAB}{TAB}self.{_make_attribute_declaration(atr)} = {atr.atr_name}\n")
            file.write("\n")

            file.write(
                f"{TAB}def to_json(self) -> Union[Dict, List]:\n"
                f"{TAB}{TAB}return {{\n"
            )
            for atr in msg.attributes:
                if not atr.is_map:
                    if not atr.repeated:
                        if _is_base_type(atr.atr_type):
                            file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': self.{atr.atr_name},\n")
                        else:
                            file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': self.{atr.atr_name}.to_json(),\n")
                    else:
                        if _is_base_type(atr.atr_type):
                            file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': self.{atr.atr_name},\n")
                        else:
                            file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': [x.to_json() for x in self.{atr.atr_name}],\n")
                else:
                    if _is_base_type(atr.map_value_type):
                        file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': {{key: value for key, value in self.{atr.atr_name}.items()}},\n")
                    else:
                        file.write(
                            f"{TAB}{TAB}{TAB}'{atr.atr_name}': {{key: value.to_json() for key, value in self.{atr.atr_name}.items()}},\n")
            file.write(
                f"{TAB}{TAB}}}"
            )
            file.write("\n\n")

            file.write(
                f"{TAB}@staticmethod\n"
                f"{TAB}def from_json(obj: Dict) -> '{msg.name}':\n"
            )
            if len(msg.attributes) == 0:
                file.write(f"{TAB}{TAB}pass")

            else:
                file.write(
                    # f"{TAB}{TAB}obj = json.loads(data)\n"
                    f"{TAB}{TAB}return {msg.name}(\n"
                )
                for atr in msg.attributes:
                    file.write(TAB + TAB + TAB)
                    file.write(f"{atr.atr_name}=")
                    if not atr.is_map:
                        if not atr.repeated:
                            if _is_base_type(atr.atr_type):
                                file.write(f"obj['{atr.atr_name}'],\n")
                            else:
                                file.write(f"{atr.atr_type}.from_json(obj['{atr.atr_name}']),\n")
                        else:
                            if _is_base_type(atr.atr_type):
                                file.write(f"obj['{atr.atr_name}'],\n")
                            else:
                                file.write(f"[{atr.atr_type}.from_json(x) for x in obj['{atr.atr_name}']],\n")
                    else:
                        if _is_base_type(atr.map_value_type):
                            file.write(f"obj['{atr.atr_name}'],\n")
                        else:
                            file.write(f"{{key: value.from_json() for key, value in obj['{atr.atr_name}'].items()}},\n")

                file.write(f"{TAB}{TAB})")
                file.write("\n\n\n")


def generate_services(parse_result: ParseResult, service_path: str, pytry: bool) -> None:
    with open(service_path, "w") as file:
        file.write(SERVICE_HEAD)

        for service in parse_result.services:
            file.write(f"class Abstract{service.name}:\n\n")
            for method in service.methods:
                file.write(
                    f"{TAB}@csrf_exempt\n"
                    f"{TAB}def service_{method.name}(self, request: HttpRequest, **kwargs) -> HttpResponse:\n"
                    f"{TAB}{TAB}if request.method == 'OPTIONS':\n"
                    f"{TAB}{TAB}{TAB}return make_response()\n"
                )
                if method.input_type != "Null":
                    file.write(
                        f"{TAB}{TAB}try:\n"
                        f"{TAB}{TAB}{TAB}input_data: {method.input_type} = {method.input_type}.from_json(json.loads(request.body))\n"
                        f"{TAB}{TAB}except Exception as e:\n"
                        f'{TAB}{TAB}{TAB}return make_response(f"error while parsing request:\\n{{str(e)}}", 400)\n'
                    )

                file.write(f"{TAB}{TAB}try:\n")
                if method.input_type != "Null":
                    if method.output_type != "Null":
                        file.write(f"{TAB}{TAB}{TAB}output_data: {method.output_type} = self.{method.name}(input_data)\n")
                    else:
                        file.write(f"{TAB}{TAB}{TAB}self.{method.name}(input_data)\n")
                else:
                    if method.output_type != "Null":
                        file.write(f"{TAB}{TAB}{TAB}output_data: {method.output_type} = self.{method.name}()\n")
                    else:
                        file.write(f"{TAB}{TAB}{TAB}self.{method.name}()\n")
                file.write(
                    f"{TAB}{TAB}except ValueError as e:\n"
                    f'{TAB}{TAB}{TAB}return make_response(str(e), 400)\n'
                    f"{TAB}{TAB}except Exception as e:\n"
                    f'{TAB}{TAB}{TAB}return make_response(f"error while processing request:\\n{{str(e)}}", 400)\n'
                    f"\n"
                )

                if method.output_type != "Null":
                    file.write(
                        f"{TAB}{TAB}return make_response(\n"
                        f"{TAB}{TAB}{TAB}content=json.dumps(output_data.to_json()),\n"
                        f"{TAB}{TAB}{TAB}status=200,\n"
                        f"{TAB}{TAB})\n"
                    )
                else:
                    file.write(
                        f"{TAB}{TAB}return make_response()\n"
                    )
                file.write(
                    f"\n"
                )

                if method.input_type != "Null":
                    if method.output_type != "Null":
                        file.write(f"{TAB}def {method.name}(self, input_data: {method.input_type}) -> {method.output_type}:\n")
                    else:
                        file.write(f"{TAB}def {method.name}(self, input_data: {method.input_type}) -> None:\n")
                else:
                    if method.output_type != "Null":
                        file.write(f"{TAB}def {method.name}(self) -> {method.output_type}:\n")
                    else:
                        file.write(f"{TAB}def {method.name}(self) -> None:\n")

                file.write(
                    f"{TAB}{TAB}raise NotImplemented\n"
                    f"\n"
                )
            file.write("\n")


def generate_impl_file(parse_result: ParseResult, py_path: str) -> None:

    for service in parse_result.services:
        imp_path = os.path.join(py_path, f"{service.name}_impl.py")
        if os.path.exists(imp_path):
            logger.log(35, f"implementation file for service {service.name}  already exists, it won't be rewritten")
            continue
        logger.log(35, f"implementation file for service {service.name} doesn't exists, it will be created")

        with open(imp_path, "w") as file:
            file.write(
                f"from .services import Abstract{service.name}\n"
                f"from .generated_messages import *\n"
                f"\n\n"
                f"class {service.name}(Abstract{service.name}):\n"
                f"\n"
            )

            for method in service.methods:
                if method.input_type != "Null":
                    if method.output_type != "Null":
                        file.write(
                            f"{TAB}def {method.name}(self, input_data: {method.input_type}) -> {method.output_type}:\n")
                    else:
                        file.write(f"{TAB}def {method.name}(self, input_data: {method.input_type}) -> None:\n")
                else:
                    if method.output_type != "Null":
                        file.write(f"{TAB}def {method.name}(self) -> {method.output_type}:\n")
                    else:
                        file.write(f"{TAB}def {method.name}(self) -> None:\n")

                file.write(
                    f"{TAB}{TAB}raise NotImplemented\n"
                )
                file.write("\n")


def generate_urls(parse_result: ParseResult, urls_path: str) -> None:
    with open(urls_path, "w") as file:
        file.write(
            f"{HEAD}"
            f"\n\n"
            f"from django.urls import path\n"
            f"\n"
        )
        for service in parse_result.services:
            file.write(f"from .{service.name}_impl import {service.name}\n")

        file.write("\n\n")

        for service in parse_result.services:
            file.write(f"service_{service.name} = {service.name}()\n")

        file.write("\n")
        file.write(f"urlpatterns = [\n")

        for service in parse_result.services:
            file.write(f"{TAB}# urls for {service.name}\n")
            for method in service.methods:
                file.write(f"{TAB}path('{method.name}', service_{service.name}.service_{method.name}),\n")
            file.write(f"\n")

        file.write(f"]\n")


def py_gen(parse_result: ParseResult, py_path: str, **params) -> None:
    pytry = params.get('pytry', False)
    logger.log(35, f"py generation [extra parameters: PyTry={pytry}]...")
    generate_messages(parse_result, os.path.join(py_path, "generated_messages.py"))
    generate_services(parse_result, os.path.join(py_path, "services.py"), pytry)
    generate_impl_file(parse_result, py_path)
    generate_urls(parse_result, os.path.join(py_path, "api_urls.py"))
    logger.log(35, "py generation... DONE")
