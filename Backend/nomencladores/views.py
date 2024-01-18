from rest_framework import viewsets, generics
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from reportes.models import CommercialOffice


class CommercialOfficeProvinceView(viewsets.ModelViewSet):
    serializer_class = CommercialOfficeProvinceSerializer
    queryset = CommercialOffice.objects.values("office_province").distinct().order_by('office_province')
    pagination_class = None
    permission_classes = [IsAuthenticated]