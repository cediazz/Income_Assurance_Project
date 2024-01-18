from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from reportes.models import CommercialOffice,CommercialOperation
from seguridad.models import TraceLog


class MyModelAdminTraceLog(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return True

class MyModelAdminUserAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):  #No se puede agregar usuarios
        return False

    """def has_change_permission(self, request,obj=None):  #No se puede modificar usuarios
        return False"""



admin.site.unregister(User)
admin.site.register(User, MyModelAdminUserAdmin)
admin.site.register(Permission)
admin.site.register(TraceLog, MyModelAdminTraceLog)
