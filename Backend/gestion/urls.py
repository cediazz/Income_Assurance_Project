from django.urls import path,include
from .views import Process_Information


urlpatterns = [
    path('gestionar-informacion/', Process_Information.as_view()),
]