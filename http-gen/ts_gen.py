import logging
import os

from utils import ParseResult, _is_base_type, MessageAttribute, Message, find_message_by_name

TAB = "    "
HEAD = """// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)"""


logger = logging.Logger(__name__)


def _base_type_to_ts_types(atr_type: str) -> str:
    assert _is_base_type(atr_type), f"Attempt to convert non base type {atr_type} ty ts base type"

    if atr_type == "int":
        return "number"
    elif atr_type == "string":
        return "string"
    elif atr_type == "float":
        return "number"
    elif atr_type == "boolean":
        return "boolean"
    else:
        ValueError(f"unknown base py type: {atr_type}")


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
                if _is_base_type(atr.atr_type):
                    file.write(
                        f"{TAB}{atr.atr_name}: {_base_type_to_ts_types(atr.atr_type)}"
                    )
                else:
                    file.write(f"{TAB}{atr.atr_name}: {atr.atr_type}")
                if atr.repeated:
                    file.write("[]")
                file.write("\n")
            file.write("}\n")

            file.write(f"export function construct_{msg.name}(x: any): {msg.name} {{\n")
            if _is_all_atr_basic(msg):
                file.write(
                    f"{TAB}return x as {msg.name}\n"
                    f"}}\n\n\n"
                )
            else:
                file.write(f"{TAB}return {{\n")
                if _has_basic_atr(msg):
                    file.write(f"{TAB}{TAB}...x,\n")
                for atr in msg.attributes:
                    if _is_base_type(atr.atr_type):
                        pass
                        # DO NOTHING, cause we have ...x
                        # file.write(
                        #     f"{TAB}{TAB}'{atr.atr_name}': x['{atr.atr_name}'],\n"
                        # )
                    else:
                        if atr.repeated:
                            file.write(
                                f"{TAB}{TAB}'{atr.atr_name}': [\n"
                                f"{TAB}{TAB}{TAB}...x['{atr.atr_name}'].map((item: any) => construct_{atr.atr_type}(item))\n"
                                f"{TAB}{TAB}],\n"
                            )
                        else:
                            file.write(f"{TAB}{TAB}'{atr.atr_name}': construct_{atr.atr_type}(x['{atr.atr_name}']),\n")
                file.write(f"{TAB}}} as {msg.name}\n")
                file.write("}\n\n\n")


def generate_methods(parse_result: ParseResult, ts_path: str) -> None:
    for service in parse_result.services:
        dir_name = os.path.join(ts_path, service.name)
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
        with open(os.path.join(dir_name, f"{service.name}_actions.ts"), "w") as file:
            file.write(
                f"{HEAD}\n\n"
                f'import axios from "../client"\n'
                f'import * as msg from "../generated_messages"\n\n\n'
            )
            for method in service.methods:
                file.write(
                    f'export const {method.name}_START = "{method.name}_START";\n'
                    f"interface {method.name}_START_Action {{\n"
                    f"{TAB}type: typeof {method.name}_START\n"
                    f"{TAB}payload: undefined\n"
                    f"}}\n"
                )
                file.write(
                    f'export const {method.name}_SUCCESS = "{method.name}_SUCCESS";\n'
                    f"interface {method.name}_SUCCESS_Action {{\n"
                    f"{TAB}type: typeof {method.name}_SUCCESS\n"
                    f"{TAB}payload: {_base_type_to_ts_types(method.output_type) if _is_base_type(method.output_type) else 'msg.' + method.output_type}\n"
                    f"}}\n"
                )
                file.write(
                    f'export const {method.name}_REJECTED = "{method.name}_REJECTED";\n'
                    f"interface {method.name}_REJECTED_Action {{\n"
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
                    for atr in msg.attributes:
                        if _is_base_type(atr.atr_type):
                            file.write(f"{atr.atr_name}: {_base_type_to_ts_types(atr.atr_type)}")
                        else:
                            file.write(f"{TAB}{atr.atr_name}: msg.{atr.atr_type}")
                        if atr.repeated:
                            file.write("[]")
                        file.write(", ")
                file.write(
                    f") => {{\n"
                    f"{TAB}return async (dispatch: any) => {{\n"
                    f"{TAB}{TAB}dispatch({{type: {method.name}_START, payload: undefined}});\n"
                    f"\n"
                    f"{TAB}{TAB}const response = await axios.get(`{method.name}`);\n"
                    f"\n"
                    f"{TAB}{TAB}if (response.status === 200) {{\n"
                    f"{TAB}{TAB}{TAB}dispatch({{type: {method.name}_SUCCESS, payload: msg.construct_{method.output_type}(response.data)}});\n"
                    f"{TAB}{TAB}}} else {{\n"
                    f"{TAB}{TAB}{TAB}dispatch({{type: {method.name}_REJECTED, payload: response.data}});\n"
                    f"{TAB}{TAB}}}\n"
                    f"{TAB}}}\n"
                    f"}};\n\n\n"
                )

            file.write(
                f"\nexport type {service.name}Actions = (\n"
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


def ts_gen(parse_result: ParseResult, ts_path: str) -> None:
    logger.log(35, "ts generation...")
    generate_messages(parse_result, os.path.join(ts_path, "generated_messages.ts"))
    generate_methods(parse_result, ts_path)
    logger.log(35, "ts generation DONE")
