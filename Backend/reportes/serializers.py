from rest_framework import serializers
from .models import *

class CommercialOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialOffice
        fields = ["office_name","office_province"]

class CommercialOfficeProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialOffice
        fields = ["office_province"]

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        exclude = ["customer_id"]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ["service_id"]


class ComercialOperationSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=10)
    date = serializers.DateField()
    commercial_office = CommercialOfficeSerializer()
    customer = CustomerSerializer()
    service = ServiceSerializer()
    number_operations = serializers.IntegerField()
    amount_collected = serializers.DecimalField(max_digits=12, decimal_places=2)
    actual_amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    amount_cant = serializers.DecimalField(max_digits=12, decimal_places=2)


class ComercialOperationIncomeSerializer(serializers.Serializer):
    date = serializers.DateField()
    amount_collected = serializers.DecimalField(max_digits=12, decimal_places=2)
    actual_amount = serializers.DecimalField(max_digits=12, decimal_places=2)


class ComercialOperationIncomeMonthlySerializer(serializers.Serializer):
    month = serializers.IntegerField()
    total_collected = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_real = serializers.DecimalField(max_digits=12, decimal_places=2)


class ComercialOperationIncomeYearlySerializer(serializers.Serializer):
    year = serializers.IntegerField()
    total_collected = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_real = serializers.DecimalField(max_digits=12, decimal_places=2)


    