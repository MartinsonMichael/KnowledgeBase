import logging
import os

from utils import ParseResult, MessageAttribute, _is_base_type

logger = logging.Logger(__name__)

TAB = "    "
HEAD = """# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)"""
MESSAGE_HEAD = f"""{HEAD}

from typing import List
import json


"""
SERVICE_HEAD = f"""{HEAD}

import json
from typing import List
from django.http import HttpResponse, HttpRequest

from .messages import *
 

"""


def _base_type_to_py_types(atr_type: str) -> str:
    assert _is_base_type(atr_type), f"Attempt to convert non base type {atr_type} ty py base type"

    if atr_type == "int":
        return "int"
    elif atr_type == "string":
        return "str"
    elif atr_type == "float":
        return "float"
    elif atr_type == "boolean":
        return "bool"
    else:
        ValueError(f"unknown base py type: {atr_type}")


def _make_attribute_declaration(atr: MessageAttribute) -> str:
    if _is_base_type(atr.atr_type):
        if atr.repeated:
            return f"{atr.atr_name}: List[{_base_type_to_py_types(atr.atr_type)}]"
        else:
            return f"{atr.atr_name}: {_base_type_to_py_types(atr.atr_type)}"
    else:
        if atr.repeated:
            return f"{atr.atr_name}: List['{atr.atr_type}']"
        else:
            return f"{atr.atr_name}: '{atr.atr_type}'"


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
                f"{TAB}def to_bytes(self) -> str:\n"
                f"{TAB}{TAB}return json.dumps({{\n"
            )
            for atr in msg.attributes:
                if not atr.repeated:
                    if _is_base_type(atr.atr_type):
                        file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': self.{atr.atr_name},\n")
                    else:
                        file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': self.{atr.atr_name}.to_bytes(),\n")
                else:
                    if _is_base_type(atr.atr_type):
                        file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': self.{atr.atr_name},\n")
                    else:
                        file.write(f"{TAB}{TAB}{TAB}'{atr.atr_name}': [x.to_bytes() for x in self.{atr.atr_name}],\n")
            file.write(
                f"{TAB}{TAB}}})"
            )
            file.write("\n\n")

            file.write(
                f"{TAB}@staticmethod\n"
                f"{TAB}def from_bytes(data: bytes) -> '{msg.name}':\n"
            )
            if len(msg.attributes) == 0:
                file.write(f"{TAB}{TAB}pass")

            else:
                file.write(
                    f"{TAB}{TAB}obj = json.loads(data)\n"
                    f"{TAB}{TAB}return {msg.name}(\n"
                )
                for atr in msg.attributes:
                    file.write(TAB + TAB + TAB)
                    file.write(f"{atr.atr_name}=")
                    if not atr.repeated:
                        if _is_base_type(atr.atr_type):
                            file.write(f"obj['{atr.atr_name}'],\n")
                        else:
                            file.write(f"{atr.atr_type}.from_bytes(obj['{atr.atr_name}']),\n")
                    else:
                        if _is_base_type(atr.atr_type):
                            file.write(f"obj['{atr.atr_name}'],\n")
                        else:
                            file.write(f"[{atr.atr_type}.from_bytes(x) for x in obj['{atr.atr_name}']],\n")
                file.write(f"{TAB}{TAB})")
                file.write("\n\n\n")


def generate_services(parse_result: ParseResult, service_path: str) -> None:
    with open(service_path, "w") as file:
        file.write(SERVICE_HEAD)

        for service in parse_result.services:
            file.write(f"class Abstract{service.name}:\n\n")
            for method in service.methods:
                file.write(
                    f"{TAB}def service_{method.name}(self, request: HttpRequest, **kwargs) -> HttpResponse:\n"
                )
                if method.input_type != "Null":
                    file.write(
                        f"{TAB}{TAB}try:\n"
                        f"{TAB}{TAB}{TAB}input_data: {method.input_type} = {method.input_type}.from_bytes(request.body)\n"
                        f"{TAB}{TAB}except:\n"
                        f"{TAB}{TAB}{TAB}return HttpResponse(\n"
                        f"{TAB}{TAB}{TAB}{TAB}content='error while parsing request',\n"
                        f"{TAB}{TAB}{TAB}{TAB}status=400,\n"
                        f"{TAB}{TAB}{TAB})\n\n"
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
                    f"{TAB}{TAB}except:\n"
                    f"{TAB}{TAB}{TAB}return HttpResponse(\n"
                    f"{TAB}{TAB}{TAB}{TAB}content='error while processing request',\n"
                    f"{TAB}{TAB}{TAB}{TAB}status=400,\n"
                    f"{TAB}{TAB}{TAB})\n\n"
                )

                if method.output_type != "Null":
                    file.write(
                        f"{TAB}{TAB}return HttpResponse(\n"
                        f"{TAB}{TAB}{TAB}content=output_data.to_bytes(),\n"
                        f"{TAB}{TAB}{TAB}status=200,\n"
                        f"{TAB}{TAB})\n\n"
                    )
                else:
                    file.write(
                        f"{TAB}{TAB}return HttpResponse(\n"
                        f"{TAB}{TAB}{TAB}status=200,\n"
                        f"{TAB}{TAB})\n\n"
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
                    f"{TAB}{TAB}raise NotImplemented"
                )
                file.write("\n\n")


def generate_impl_file(parse_result: ParseResult, py_path: str) -> None:

    for service in parse_result.services:
        imp_path = os.path.join(py_path, f"{service.name}_impl.py")
        if os.path.exists(imp_path):
            logger.log(35, f"implementation file for service {service.name}  already exists, it won't be rewritten")
            return
        logger.log(35, f"implementation file for service {service.name} doesn't exists, it will be created")

        with open(imp_path, "w") as file:
            file.write(
                f"from .services import Abstract{service.name}"
                f"\n\n"
                f"class {service.name}(Abstract{service.name}):\n"
                f"{TAB}pass\n"
            )


def generate_urls(parse_result: ParseResult, urls_path: str) -> None:
    with open(urls_path, "w") as file:
        file.write(
            f"{HEAD}"
            f"\n\n"
            f"from django.urls import path\n"
            f"from functools import partial\n"
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
            for method in service.methods:
                file.write(f"{TAB}path('{method.name}', service_{service.name}.service_{method.name}),\n")

        file.write(f"]\n")


def py_gen(parse_result: ParseResult, py_path: str) -> None:
    logger.log(35, "py generation...")
    generate_messages(parse_result, os.path.join(py_path, "messages.py"))
    generate_services(parse_result, os.path.join(py_path, "services.py"))
    generate_impl_file(parse_result, py_path)
    generate_urls(parse_result, os.path.join(py_path, "api_urls.py"))
    logger.log(35, "py generation... DONE")
