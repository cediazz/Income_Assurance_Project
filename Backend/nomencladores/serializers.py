from rest_framework import serializers
from reportes.models import CommercialOffice


class CommercialOfficeProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialOffice
        fields = ["office_province"]

