from django.db import models
from django.contrib.auth.models import User


class TraceLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    description = models.CharField(max_length=255)
    table_name = models.CharField(max_length=100)

    def __str__(self):
        return f"nombre de usuario: {self.user.username} - fecha: {self.date} - hora: {self.time} - descripcion: {self.description}"