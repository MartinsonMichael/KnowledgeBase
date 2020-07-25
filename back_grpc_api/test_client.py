import grpc

import os
import sys

sys.path.insert(0, os.path.join(os.curdir, 'generated'))

from generated import note_pb2
from generated import note_pb2_grpc

# открываем канал и создаем клиент
channel = grpc.insecure_channel('localhost:6066')
stub = note_pb2_grpc.NoteServiceStub(channel)


response = stub.getAllNotesHeaders2(note_pb2.Null())
print(response.list)
