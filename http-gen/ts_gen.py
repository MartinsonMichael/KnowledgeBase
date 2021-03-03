import logging
import os
from typing import TextIO

from utils import ParseResult, _is_base_type, MessageAttribute, Message, find_message_by_name, ServiceMethod

TAB = "    "
HEAD = """// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)"""


logger = logging.Logger(__name__)


def _lower_first_letter(s: str) -> str:
    if len(s) == 0:
        return s
    return s[0].lower() + s[1:]


def _base_type_to_ts_types(atr_type: str) -> str:
    assert _is_base_type(atr_type), f"Attempt to convert non base type {atr_type} ty ts base type"

    if atr_type == "int32":
        return "number"
    elif atr_type == "string":
        return "string"
    elif atr_type == "float":
        return "number"
    elif atr_type == "bool":
        return "boolean"
    else:
        ValueError(f"unknown base py type: {atr_type}")


def _make_map_type(atr: MessageAttribute) -> str:
    if _is_base_type(atr.map_value_type):
        return (
            f"{{[key: {_base_type_to_ts_types(atr.map_key_type)}]: {_base_type_to_ts_types(atr.map_value_type)}}}"
        )
    else:
        return (
            f"{{[key: {_base_type_to_ts_types(atr.map_key_type)}]: {atr.map_value_type}}}"
        )


def _is_all_atr_basic(msg: Message) -> bool:
    for atr in msg.attributes:
        if not _is_base_type(atr.atr_type):
            return False
    return True


def _has_basic_atr(msg: Message) -> bool:
    for atr in msg.attributes:
        if _is_base_type(atr.atr_type):
            return True
    return False


def _has_map_atr(msg: Message) -> bool:
    for atr in msg.attributes:
        if atr.is_map:
            return True
    return False


def generate_messages(parse_result: ParseResult, msg_path: str) -> None:
    with open(msg_path, "w") as file:
        file.write(
            f"{HEAD}\n\n"
        )

        for msg in parse_result.messages:
            file.write(
                f"export interface {msg.name} {{\n"
            )
            for atr in msg.attributes:
                if not atr.is_map:
                    if _is_base_type(atr.atr_type):
                        file.write(
                            f"{TAB}{atr.atr_name}: {_base_type_to_ts_types(atr.atr_type)}"
                        )
                    else:
                        file.write(f"{TAB}{atr.atr_name}: {atr.atr_type}")
                    if atr.repeated:
                        file.write("[]")
                else:
                    file.write(f"{TAB}{atr.atr_name}: {_make_map_type(atr)}")
                file.write("\n")
            file.write("}\n")

            file.write(f"export function construct_{msg.name}(x: any): {msg.name} {{\n")
            if _is_all_atr_basic(msg):
                file.write(
                    f"{TAB}return x as {msg.name}\n"
                    f"}}\n\n\n"
                )
            elif not _has_map_atr(msg):
                file.write(f"{TAB}return {{\n")
                if _has_basic_atr(msg):
                    file.write(f"{TAB}{TAB}...x,\n")
                for atr in msg.attributes:
                    if not _is_base_type(atr.atr_type):
                        if atr.repeated:
                            file.write(
                                f"{TAB}{TAB}'{atr.atr_name}': [\n"
                                f"{TAB}{TAB}{TAB}...x['{atr.atr_name}'].map((item: any) => construct_{atr.atr_type}(item))\n"
                                f"{TAB}{TAB}],\n"
                            )
                        else:
                            file.write(f"{TAB}{TAB}'{atr.atr_name}': construct_{atr.atr_type}(x['{atr.atr_name}']),\n")
                file.write(f"{TAB}}} as {msg.name}\n")
                file.write(f"}}\n\n\n")
            else:
                file.write(f"{TAB}let obj = {{\n")
                if _has_basic_atr(msg):
                    file.write(f"{TAB}{TAB}...x,\n")
                for atr in msg.attributes:
                    if not _is_base_type(atr.atr_type) and not atr.is_map:
                        if atr.repeated:
                            file.write(
                                f"{TAB}{TAB}'{atr.atr_name}': [\n"
                                f"{TAB}{TAB}{TAB}...x['{atr.atr_name}'].map((item: any) => construct_{atr.atr_type}(item))\n"
                                f"{TAB}{TAB}],\n"
                            )
                        else:
                            file.write(f"{TAB}{TAB}'{atr.atr_name}': construct_{atr.atr_type}(x['{atr.atr_name}']),\n")
                    if atr.is_map:
                        file.write(f"{TAB}{TAB}'{atr.atr_name}': {{}} as {_make_map_type(atr)},\n")
                file.write(f"{TAB}}};\n")
                for atr in msg.attributes:
                    if not atr.is_map:
                        continue
                    file.write(
                        f"{TAB}Object.keys(x['{atr.atr_name}']).forEach(\n"
                        f"{TAB}{TAB}(obj_key: {atr.map_key_type}) => obj.{atr.atr_name}[obj_key] = "
                    )
                    if _is_base_type(atr.map_value_type):
                        file.write(f"x['{atr.atr_name}'][obj_key]\n")
                    else:
                        file.write(f"construct_{atr.map_value_type}(x['{atr.atr_name}'][obj_key])\n")
                    file.write(f"{TAB});")
                file.write(
                    f"\n"
                    f"{TAB}return obj as {msg.name};"
                    f"}}\n\n\n"
                )


def _write_method_to_file(
        method: ServiceMethod,
        file: TextIO,
        parse_result: ParseResult,
        export_action_interface: bool = False,
) -> None:
    file.write(
        f'export const {method.name}_START = "{method.name}_START";\n'
        f"{'export ' if export_action_interface else ''}interface {method.name}_START_Action {{\n"
        f"{TAB}type: typeof {method.name}_START\n"
        f"{TAB}payload: undefined\n"
        f"}}\n"
    )
    file.write(
        f'export const {method.name}_SUCCESS = "{method.name}_SUCCESS";\n'
        f"{'export ' if export_action_interface else ''}interface {method.name}_SUCCESS_Action {{\n"
        f"{TAB}type: typeof {method.name}_SUCCESS\n"
    )
    if method.output_type == "Null":
        file.write(f"{TAB}payload: undefined\n")
    elif _is_base_type(method.output_type):
        file.write(f"{TAB}payload: {_base_type_to_ts_types(method.output_type)}\n")
    else:
        file.write(f"{TAB}payload: msg.{method.output_type}\n")
    file.write(f"}}\n")

    file.write(
        f'export const {method.name}_REJECTED = "{method.name}_REJECTED";\n'
        f"{'export ' if export_action_interface else ''}interface {method.name}_REJECTED_Action {{\n"
        f"{TAB}type: typeof {method.name}_REJECTED\n"
        f"{TAB}payload: string\n"
        f"}}\n"
    )
    file.write("\n")

    file.write(
        f"export const {method.name} = ("
    )
    if method.input_type != "Null":
        msg: Message = find_message_by_name(parse_result, method.input_type)
        for i, atr in enumerate(msg.attributes):
            if _is_base_type(atr.atr_type):
                file.write(f"{atr.atr_name}: {_base_type_to_ts_types(atr.atr_type)}")
            else:
                file.write(f"{atr.atr_name}: msg.{atr.atr_type}")
            if atr.repeated:
                file.write("[]")
            if i + 1 < len(msg.attributes):
                file.write(", ")
    file.write(
        f") => {{\n"
        f"{TAB}return async (dispatch: any) => {{\n"
        f"{TAB}{TAB}dispatch({{type: {method.name}_START, payload: undefined}});\n"
        f"\n"
    )
    if method.input_type == "Null":
        file.write(
            f"{TAB}{TAB}const response = await axios.get(\n"
            f"{TAB}{TAB}{TAB}'{method.name}',\n"
            f"{TAB}{TAB}{TAB}{{\n"
            f"{TAB}{TAB}{TAB}{TAB}'headers': {{\n"
            f"{TAB}{TAB}{TAB}{TAB}{TAB}'Access-Control-Allow-Origin': '*',\n"
            f"{TAB}{TAB}{TAB}{TAB}{TAB}'Access-Control-Allow-Headers': '*',\n"
            f"{TAB}{TAB}{TAB}{TAB}}},\n"
            f"{TAB}{TAB}{TAB}}},\n"
            f"{TAB}{TAB});\n"
        )
    else:
        file.write(
            f"{TAB}{TAB}const response = await axios.post(\n"
            f"{TAB}{TAB}{TAB}'{method.name}',\n"
            f"{TAB}{TAB}{TAB}{{\n"
        )
        msg: Message = find_message_by_name(parse_result, method.input_type)
        for atr in msg.attributes:
            file.write(f"{TAB}{TAB}{TAB}{TAB}'{atr.atr_name}': {atr.atr_name},\n")

        file.write(
            f"{TAB}{TAB}{TAB}}},\n"
            f"{TAB}{TAB}{TAB}{{\n"
            f"{TAB}{TAB}{TAB}{TAB}'headers': {{\n"
            f"{TAB}{TAB}{TAB}{TAB}{TAB}'Access-Control-Allow-Origin': '*',\n"
            f"{TAB}{TAB}{TAB}{TAB}{TAB}'Access-Control-Allow-Headers': '*',\n"
            f"{TAB}{TAB}{TAB}{TAB}}},\n"
            f"{TAB}{TAB}{TAB}}},\n"
            f"{TAB}{TAB});\n"
        )

    file.write(
        f"\n"
        f"{TAB}{TAB}if (response.status === 200) {{\n"
        f"{TAB}{TAB}{TAB}dispatch({{type: {method.name}_SUCCESS, payload: "
    )
    if method.output_type == "Null":
        file.write(f"undefined}});\n")
    elif _is_base_type(method.output_type):
        file.write(f"response.data}});\n")
    else:
        file.write(f"msg.construct_{method.output_type}(response.data)}});\n")
    file.write(
        f"{TAB}{TAB}}} else {{\n"
        f"{TAB}{TAB}{TAB}dispatch({{type: {method.name}_REJECTED, payload: response.data}});\n"
        f"{TAB}{TAB}}}\n"
        f"{TAB}}}\n"
        f"}};\n\n\n"
    )


def generate_methods(parse_result: ParseResult, ts_path: str) -> None:
    for service in parse_result.services:
        dir_name = os.path.join(ts_path, _lower_first_letter(service.name))
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
        COMMON_METHOD_HEADER = (
            f"{HEAD}\n\n"
            f'import axios from "../client"\n'
            f'import * as msg from "../generated_messages"\n\n'
        )
        with open(os.path.join(dir_name, f"{_lower_first_letter(service.name)}_actions.ts"), "w") as file:
            file.write(COMMON_METHOD_HEADER)
            for method in service.methods:
                if 'Generate-once-ts' in method.changers:
                    file.write(
                        f'import {{ '
                        f"{method.name}_START_Action, "
                        f"{method.name}_SUCCESS_Action, "
                        f"{method.name}_REJECTED_Action "
                        f'}} from "./{_lower_first_letter(method.name)}_action"\n'
                    )
            file.write("\n\n")

            for method in service.methods:
                if 'Generate-once-ts' in method.changers:
                    continue
                _write_method_to_file(method, file, parse_result)

            file.write(
                f"\nexport type {service.name}ActionType = (\n"
            )
            for i, method in enumerate(service.methods):
                file.write(
                    f"{TAB}{method.name}_START_Action |\n"
                    f"{TAB}{method.name}_SUCCESS_Action |\n"
                    f"{TAB}{method.name}_REJECTED_Action {'|' if i + 1 < len(service.methods) else ''}\n"
                )
            file.write(
                f")"
            )

        for method in service.methods:
            if 'Generate-once-ts' not in method.changers:
                continue
            file_name = os.path.join(dir_name, f"{_lower_first_letter(method.name)}_action.ts")
            if os.path.exists(file_name):
                continue
            with open(file_name, "w") as file:
                file.write(COMMON_METHOD_HEADER)
                _write_method_to_file(method, file, parse_result, export_action_interface=True)


def generate_reducer(parse_result: ParseResult, ts_path: str) -> None:
    for service in parse_result.services:
        dir_name = os.path.join(ts_path, _lower_first_letter(service.name))
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
        file_path = os.path.join(dir_name, f"{_lower_first_letter(service.name)}_reducer.ts")
        if os.path.exists(file_path):
            logger.log(35, f"reducer for {service.name} already exist, it won't be recreated")
            continue
        logger.log(35, f"reducer for {service.name} doesn't exist, it would be created")

        with open(file_path, "w") as file:
            file.write(
                f'import * as msg from "../generated_messages"\n'
                f'import {{ {service.name}ActionType }} from "./{_lower_first_letter(service.name)}_actions"\n'
                f'\n\n'
            )

            file.write(
                f"export interface {service.name}State {{\n"
                f"{TAB}// TODO add valuable state, probably rename\n"
                f"\n"
                f"{TAB}isLoading: boolean\n"
                f"{TAB}error?: string\n"
                f"}}\n"
                f"\n"
                f"const initialState: {service.name}State = {{\n"
                f"{TAB}// TODO add valuable state, probably rename\n"
                f"\n"
                f"{TAB}isLoading: false,\n"
                f"{TAB}error: undefined,\n"
                f"}} as {service.name}State;\n"
                f"\n\n"
                f"export function {service.name}Reducer(state = initialState, action: {service.name}ActionType): {service.name}State {{\n"
                f"{TAB}switch (action.type) {{\n"
            )

            for i, method in enumerate(service.methods):
                file.write(
                    f'{TAB}{TAB}case "{method.name}_START":\n'
                    f"{TAB}{TAB}{TAB}return {{\n"
                    f"{TAB}{TAB}{TAB}{TAB}...state,\n"
                    f"{TAB}{TAB}{TAB}{TAB}isLoading: true,\n"
                    f"{TAB}{TAB}{TAB}{TAB}error: undefined,\n"
                    f"{TAB}{TAB}{TAB}}} as {service.name}State;\n"
                    f"\n"
                )
                file.write(
                    f'{TAB}{TAB}case "{method.name}_SUCCESS":\n'
                    f"{TAB}{TAB}{TAB}return {{\n"
                    f"{TAB}{TAB}{TAB}{TAB}...state,\n"
                    f"{TAB}{TAB}{TAB}{TAB}isLoading: false,\n"
                    f"{TAB}{TAB}{TAB}{TAB}error: undefined,\n"
                    f"{TAB}{TAB}{TAB}}} as {service.name}State;\n"
                    f"\n"
                )
                file.write(
                    f'{TAB}{TAB}case "{method.name}_REJECTED":\n'
                    f"{TAB}{TAB}{TAB}return {{\n"
                    f"{TAB}{TAB}{TAB}{TAB}...state,\n"
                    f"{TAB}{TAB}{TAB}{TAB}isLoading: false,\n"
                    f"{TAB}{TAB}{TAB}{TAB}error: action.payload,\n"
                    f"{TAB}{TAB}{TAB}}} as {service.name}State;\n"
                    f"\n"
                    f"\n"
                )

            file.write(
                f"{TAB}{TAB}default:\n"
                f"{TAB}{TAB}{TAB}return state\n"
                f"{TAB}}}\n"
                f"}}\n"
            )


def ts_gen(parse_result: ParseResult, ts_path: str, **params) -> None:
    logger.log(35, "ts generation...")
    generate_messages(parse_result, os.path.join(ts_path, "generated_messages.ts"))
    generate_methods(parse_result, ts_path)
    generate_reducer(parse_result, ts_path)
    logger.log(35, "ts generation DONE")
