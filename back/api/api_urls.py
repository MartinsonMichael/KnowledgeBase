# This file is generated, DO NOT EDIT IT
# Michael Martinson http generator (c)

from django.urls import path

from .StructureService_impl import StructureService
from .NoteService_impl import NoteService
from .BackupService_impl import BackupService
from .TestService_impl import TestService


service_StructureService = StructureService()
service_NoteService = NoteService()
service_BackupService = BackupService()
service_TestService = TestService()

urlpatterns = [
    # urls for StructureService
    path('getStructure', service_StructureService.service_getStructure),
    path('getNotesWithoutLinks', service_StructureService.service_getNotesWithoutLinks),
    path('createNewTag', service_StructureService.service_createNewTag),
    path('createNewNote', service_StructureService.service_createNewNote),
    path('updateTag', service_StructureService.service_updateTag),

    # urls for NoteService
    path('getNote', service_NoteService.service_getNote),
    path('addNoteTag', service_NoteService.service_addNoteTag),
    path('delNoteTag', service_NoteService.service_delNoteTag),
    path('addNoteLink', service_NoteService.service_addNoteLink),
    path('delNoteLink', service_NoteService.service_delNoteLink),
    path('updateNoteName', service_NoteService.service_updateNoteName),
    path('updateNoteBody', service_NoteService.service_updateNoteBody),

    # urls for BackupService
    path('applyBackup', service_BackupService.service_applyBackup),

    # urls for TestService
    path('getSimpleMsg', service_TestService.service_getSimpleMsg),
    path('getComplexMsg', service_TestService.service_getComplexMsg),
    path('getComplexBySimple', service_TestService.service_getComplexBySimple),
    path('postComplex', service_TestService.service_postComplex),
    path('postNull', service_TestService.service_postNull),

]
