from rest_framework import  serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import TraceLog




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):


    def validate(self, attrs):
        data = super().validate(attrs) #Este método se utiliza para validar y procesar los datos enviados al serializador
        refresh = self.get_token(self.user)
        access = refresh.access_token
        data["username"] = self.user.username
        data["first_name"] = self.user.first_name
        return data








