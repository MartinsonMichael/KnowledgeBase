# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)

from django.urls import path

from .NoteService_impl import NoteService
from .TestService_impl import TestService


service_NoteService = NoteService()
service_TestService = TestService()

urlpatterns = [
    # urls for NoteService
    path('getStructure', service_NoteService.service_getStructure),
    path('getNotesHeaderList', service_NoteService.service_getNotesHeaderList),
    path('getNotes', service_NoteService.service_getNotes),

    # urls for TestService
    path('getTestList', service_TestService.service_getTestList),
    path('getComplexByComplex', service_TestService.service_getComplexByComplex),
    path('getBasicComplex', service_TestService.service_getBasicComplex),
    path('changeMisterPresident', service_TestService.service_changeMisterPresident),

]
