from django.db import models

class CommercialOffice(models.Model):
    office_id = models.CharField(primary_key=True, max_length=64)
    office_name = models.CharField(max_length=100)
    office_province = models.CharField(max_length=50)
    class Meta:
        verbose_name = 'commercial_office'

class Customer(models.Model):
    customer_id = models.CharField(primary_key=True, max_length=20)
    customer_type = models.CharField(max_length=1)
    customer_name = models.CharField(max_length=100)
    class Meta:
        verbose_name = 'customer'

class Service(models.Model):
    service_id = models.CharField(primary_key=True, max_length=8)
    service_name = models.CharField(max_length=100)
    service_price = models.DecimalField(max_digits=12, decimal_places=2)
    class Meta:
        verbose_name = 'service'

class CommercialOperation(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    date = models.DateField()
    commercial_office = models.ForeignKey(CommercialOffice, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    number_operations = models.IntegerField()
    amount_collected = models.DecimalField(max_digits=12, decimal_places=2)
    class Meta:
        verbose_name = 'commercial_operation'


