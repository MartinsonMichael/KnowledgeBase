import logging
import os
import re
from typing import List


logger = logging.Logger(__name__)


class MessageAttribute:
    def __init__(self, atr_name: str, atr_type: str, repeated: bool):
        self.atr_name = atr_name
        self.atr_type = atr_type
        self.repeated = repeated

    def __str__(self):
        return f"{self.atr_name}: {'[]' if self.repeated else ''}{self.atr_type}"


class Message:
    def __init__(self):
        self.name: str = ""
        self.attributes: List[MessageAttribute] = []

    def __str__(self):
        res = self.name + "\n"
        for x in self.attributes:
            res += "\t" + str(x) + "\n"
        return res


class ServiceMethod:
    def __init__(self, name: str, input_type: str, output_type: str):
        self.name = name
        self.input_type = input_type
        self.output_type = output_type

    def __str__(self):
        return f"{self.name}: {self.input_type} -> {self.output_type}"


class Service:
    def __init__(self):
        self.name: str = ""
        self.methods: List[ServiceMethod] = []

    def __str__(self):
        res = self.name + "\n"
        for x in self.methods:
            res += "\t" + str(x) + "\n"
        return res


class ParseResult:
    def __init__(self):
        self.messages: List[Message] = []
        self.services: List[Service] = []

    def __str__(self):
        res = f"Services ({len(self.services)}):\n"
        for x in self.services:
            res += str(x) + "\n"
        res += f"Messages ({len(self.messages)}):\n"
        for x in self.messages:
            res += str(x) + "\n"
        return res


def parse_folder(proto_path: str) -> ParseResult:
    logger.log(35, f"parse folder {proto_path}...")
    result = ParseResult()
    for proto_file_path in os.listdir(proto_path):
        if proto_file_path.endswith(".proto"):
            buf: ParseResult = parse_file(os.path.join(proto_path, proto_file_path))
            result.messages.extend(buf.messages)
            result.services.extend(buf.services)

    logger.log(35, f"parse folder {proto_path} DONE")
    return result


def parse_file(proto_file_path: str) -> ParseResult:
    logger.log(35, f"parse file {proto_file_path}...")
    result = ParseResult()
    state = "none"

    msg: Message = Message()
    service: Service = Service()

    for line in open(proto_file_path).readlines():
        if re.match(r"\s*\n", line) is not None:
            continue

        if re.match(r"\s*//.*\n", line) is not None:
            continue

        if state == "none":
            if line.startswith("message"):
                msg = Message()
                m = re.match(r"message\s+(?P<name>\w+)\s+{", line)
                msg.name = m.group('name')
                state = "msg"
                logger.log(35, f"start parse message {msg.name}")
                continue

            if line.startswith("service"):
                m = re.match(r"service\s+(?P<name>\w+)\s+{", line)
                service = Service()
                service.name = m.group('name')
                state = "service"
                logger.log(35, f"start parse service {service.name}")
                continue

        elif state == "msg":
            if re.match(r"\s*}", line) is not None:
                result.messages.append(msg)
                logger.log(35, f"add message {msg.name}")
                state = "none"
                continue

            m = re.match(
                r"\s*(?P<repeated>repeated)?\s*(?P<type>\w+)\s+(?P<name>\w+)(\s+=\s+(?P<number>\d+))?",
                line,
            )
            if m is not None:
                msg.attributes.append(
                    MessageAttribute(
                        atr_name=m.group('name'),
                        atr_type=m.group('type'),
                        repeated=m.group('repeated') == 'repeated',
                    )
                )
            else:
                logger.log(35, f"unexpected message None match in line:\n|{line}|")

        elif state == "service":
            if re.match(r"\s*}", line) is not None:
                result.services.append(service)
                logger.log(35, f"add service {service.name}")
                state = "none"
                continue

            m = re.match(
                r"\s*rpc\s+(?P<name>\w+)\s*\(\s*(?P<input>\w+)\s*\)\s+returns\s+\(\s*(?P<output>\w+)\s*\)\s+{}",
                line
            )
            if m is not None:
                service.methods.append(
                    ServiceMethod(
                        name=m.group('name'),
                        input_type=m.group('input'),
                        output_type=m.group('output'),
                    )
                )
            else:
                logger.log(35, f"unexpected service None match in line:\n|{line}|")

    logger.log(35, f"parse file {proto_file_path} DONE")
    return result


def _is_base_type(atr_type: str) -> bool:
    return atr_type in ['int', 'string', 'float', 'boolean']


def validate_parsed_data(parsed_results: ParseResult) -> None:
    msg_names = [msg.name for msg in parsed_results.messages]
    for msg in parsed_results.messages:
        for atr in msg.attributes:
            if atr.atr_type in msg_names:
                continue
            elif _is_base_type(atr.atr_type):
                continue
            else:
                raise ValueError(f"message {msg.name} contain attribute with unknown type {atr.atr_type}")

    for service in parsed_results.services:
        for method in service.methods:
            if method.input_type == "Null" or method.input_type in msg_names:
               pass
            else:
                raise ValueError(
                    f"service {service.name} contain method {method.name} with unknown input type {method.input_type}"
                )
            if method.output_type == "Null" or method.output_type in msg_names:
                pass
            else:
                raise ValueError(
                    f"service {service.name} contain method {method.name} with unknown output type {method.input_type}"
                )


def find_message_by_name(parser_result: ParseResult, msg_name: str) -> Message:
    for msg in parser_result.messages:
        if msg.name == msg_name:
            return msg

    raise ValueError(f"no such message: {msg_name}")
