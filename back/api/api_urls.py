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
    path('getSimpleMsg', service_TestService.service_getSimpleMsg),
    path('getComplexMsg', service_TestService.service_getComplexMsg),
    path('getComplexBySimple', service_TestService.service_getComplexBySimple),
    path('postComplex', service_TestService.service_postComplex),
    path('postNull', service_TestService.service_postNull),

]
