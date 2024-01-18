from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from faker import Faker
from rest_framework import status
import pdb
import time

faker = Faker()

class Test(APITestCase):
    def setUp(self):
        self.login_url = "/Login/"  # ruta donde se va a realizar la prueba
        # Configurar datos para hacer las pruebas:
        self.user = User.objects.create_user(username="Prueba", password="123", email=faker.email())
        response = self.client.post(
            self.login_url,
            {
                'username': "rfernandez",
                'password': "carlos"
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        pdb.set_trace()  # pausar la ejecucion
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_asas(self):
        pass

    def test_commercial_operations(self):
        response = self.client.get("/reportes/CommercialOperations/")
        pdb.set_trace()  # pausar la ejecucion
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_multiple_requests(self):
        start_time = time.time()
        res = []
        for _ in range(2000):
            response = self.client.get("/reportes/CommercialOperations/")
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            res.append(response.status_code)
        end_time = time.time()
        elapsed_time = end_time - start_time
        print(res)
        print(f"Tiempo de ejecucion: {elapsed_time}")

