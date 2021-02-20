import argparse
import logging
import sys

from utils import parse_folder, ParseResult, validate_parsed_data
from py_gen import py_gen
from ts_gen import ts_gen


logging.basicConfig(stream=sys.stdout, level=35)
logger = logging.Logger(__name__)


def main(proto_path: str, py_path: str, ts_path: str, **params):
    logger.log(35, f"Got:\nproto path: {proto_path}\npy_path: {py_path}\nts_path: {ts_path}\n")

    parse_result: ParseResult = parse_folder(proto_path)
    validate_parsed_data(parse_result)
    logger.log(35, "Parsed data correct")

    py_gen(parse_result, py_path, **params)

    ts_gen(parse_result, ts_path, **params)

    logger.log(35, "Generation finished.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--proto-path', type=str)
    parser.add_argument('--py-path', type=str)
    parser.add_argument('--ts-path', type=str)

    parser.add_argument('--pytry', default=False, action='store_true')

    args = parser.parse_args()
    main(args.proto_path, args.py_path, args.ts_path, pytry=args.pytry)
