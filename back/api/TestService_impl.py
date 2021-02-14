from .services import AbstractTestService
from .generated_messages import *


class TestService(AbstractTestService):

    def getTestList(self, input_data: Test) -> None:
        raise NotImplemented

    def getComplexByComplex(self, input_data: Complex) -> Complex:
        raise NotImplemented

    def getBasicComplex(self) -> Complex:
        raise NotImplemented

    def changeMisterPresident(self) -> None:
        raise NotImplemented

