from rest_framework import viewsets, generics
from .serializers import *
from rest_framework.response import Response
from .models import *
from django.db.models import Sum, F
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from seguridad.Permissions import SeeCommercialOperations


class CommercialOperationView(viewsets.ModelViewSet):
    serializer_class = ComercialOperationSerializer
    queryset = CommercialOperation.objects.annotate(
        actual_amount=F("service__service_price") * F("number_operations"),
        amount_cant=F("amount_collected") / F("number_operations")).order_by("id")
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        "date": ['exact'],
        'commercial_office__office_province': ['exact']
    }
    permission_classes = [IsAuthenticated,SeeCommercialOperations]

    # el objeto F() Hace posible hacer referencia a los valores de campo del modelo y realizar operaciones de base de datos
    @action(detail=False, methods=['GET'])
    def get_incomes(self, request):
        date1 = request.query_params.get('date1')
        date2 = request.query_params.get('date2')
        comercial_operations = CommercialOperation.objects.filter(date__gte=date1, date__lte=date2). \
            values("date").annotate(amount_collected=Sum("amount_collected"),
                                    actual_amount=Sum(F("service__service_price") * F("number_operations"))).order_by(
            "date")
        if len(comercial_operations) == 0:
            return Response({"message": "No se econtraron resultados para las fechas indicadas"})
        cm_total = CommercialOperation.objects.filter(date__gte=date1, date__lte=date2).aggregate(
            total_collected=Sum("amount_collected"),
            total_real=Sum(F("service__service_price") * F("number_operations")))
        comercial_operations_serializers = ComercialOperationIncomeSerializer(comercial_operations, many=True)
        return Response({
            "by_day": comercial_operations_serializers.data,
            'total_collected': cm_total['total_collected'],
            'total_real': cm_total['total_real']
        })

    @action(detail=False, methods=['GET'])
    def get_incomes_monthly(self, request):
        year = request.query_params.get('year')
        # comercial_operations = CommercialOperation.objects.filter(date__icontains=year).values("date").annotate(mes=Extract("date","month"),amount_collected=Sum("amount_collected"))
        comercial_operations = CommercialOperation.objects.raw(
            f"Select 1 as id , Extract(month from date) as month,Sum(amount_collected) as total_collected,Sum(service_price * number_operations) as total_real from reportes_commercialoperation inner join reportes_service on reportes_commercialoperation.service_id=reportes_service.service_id where Extract(year from date)={year} group by month order by month")
        if len(comercial_operations) == 0:
            return Response({"message": "No se econtraron resultados para el año indicado"})
        comercial_operations_serializers = ComercialOperationIncomeMonthlySerializer(comercial_operations, many=True)
        return Response(comercial_operations_serializers.data)

    @action(detail=False, methods=['GET'])
    def get_incomes_yearly(self, request):
        year1 = request.query_params.get('year1')
        year2 = request.query_params.get('year2')
        comercial_operations = CommercialOperation.objects.raw(
            f"Select 1 as id,Extract(year from date) as year,Sum(amount_collected) as total_collected, Sum(service_price * number_operations) as total_real from reportes_commercialoperation inner join reportes_service on reportes_commercialoperation.service_id=reportes_service.service_id where Extract(year from date) >={year1} and Extract(year from date) <={year2}  group by year order by year")
        if len(comercial_operations) == 0:
            return Response({"message": "No se econtraron resultados para los años indicados"})
        comercial_operations_serializers = ComercialOperationIncomeYearlySerializer(comercial_operations, many=True)
        return Response(comercial_operations_serializers.data)
