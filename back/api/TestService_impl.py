from .service_TestService import AbstractTestService
from .generated_messages import *


class TestService(AbstractTestService):

    def getSimpleMsg(self) -> SimpleMsg:
        raise NotImplemented

    def getComplexMsg(self) -> ComplexMsg:
        raise NotImplemented

    def getComplexBySimple(self, input_data: SimpleMsg) -> ComplexMsg:
        raise NotImplemented

    def postComplex(self, input_data: ComplexMsg) -> None:
        raise NotImplemented

    def postNull(self) -> None:
        raise NotImplemented

