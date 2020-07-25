import time
from concurrent import futures

import grpc

import os
import sys
sys.path.insert(0, os.path.join(os.curdir, 'generated'))

from service_implementation import NoteServiceImplemented
from generated.note_pb2_grpc import add_NoteServiceServicer_to_server


def serve():
    # создаем сервер
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=4))

    # прикреплям хандлеры
    add_NoteServiceServicer_to_server(NoteServiceImplemented(), server)

    # запускаемся на порту 6066
    print('Starting server on port 6066.')
    server.add_insecure_port('[::]:6066')
    server.start()

    # работаем час или до прерывания с клавиатуры
    try:
        while True:
            time.sleep(3600)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()
