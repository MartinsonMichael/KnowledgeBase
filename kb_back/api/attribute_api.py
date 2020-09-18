from django.http import HttpResponse

from api.models import AttributeTable
from api.utils import createHTTPResponseOK, createHTTPResponseBAD


def get_attribute_value(request, **kwargs) -> HttpResponse:
    key = kwargs.get('key', None)
    if key is None:
        return createHTTPResponseBAD(f"bad: key is none")
    attr_obj: AttributeTable = AttributeTable.objects.filter(key=key).first()
    if attr_obj is None:
        return createHTTPResponseOK({"key": key, "value": None})

    return createHTTPResponseOK({"key": attr_obj.key, "value": attr_obj.value})


def set_attribute_value(request, **kwargs) -> HttpResponse:
    key = kwargs.get('key', None)
    value = kwargs.get('value', None)
    if key is None:
        return createHTTPResponseBAD(f"bad: key is none")
    attr_obj: AttributeTable = AttributeTable.objects.filter(key=key).first()
    if attr_obj is None:
        attr_obj = AttributeTable(key=key, value=value)
        attr_obj.save()
    else:
        attr_obj.value = value
        attr_obj.save()

    return createHTTPResponseOK({"key": attr_obj.key, "value": attr_obj.value})
