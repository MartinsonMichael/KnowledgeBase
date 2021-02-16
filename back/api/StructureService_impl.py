from .services import AbstractStructureService
from .generated_messages import *


class StructureService(AbstractStructureService):

    def getStructure(self) -> Structure:
        raise NotImplemented

