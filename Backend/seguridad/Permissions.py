from rest_framework import permissions

class SeeCommercialOperations(permissions.BasePermission):
    message = 'No tiene permisos para procesar o visualizar las operaciones comerciales'
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        required_groups = ['Obtener Operaciones Comerciales']  # Lista de grupos requeridos

        # Verificar si el usuario pertenece a al menos uno de los grupos requeridos
        """ name__in es un filtro que busca coincidencias en el campo name de la tabla auth_group. 
        El operador __in indica que se deben buscar coincidencias en una lista de valores, en este 
        caso required_groups"""
        return bool(request.user.groups.filter(name__in=required_groups))