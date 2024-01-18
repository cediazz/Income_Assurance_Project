from rest_framework.response import Response
from rest_framework.views import APIView
from .process_information import download_information, read_csv, insert_data
import psycopg2
from ftplib import error_perm
from rest_framework.permissions import IsAuthenticated
from seguridad.models import TraceLog
from seguridad.Permissions import SeeCommercialOperations

class Process_Information(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        # procesar la informacion del fichero
        try:
            download_information()
            data = read_csv()
            insert_data(data)
        except ConnectionRefusedError as e:
            TraceLog.objects.create(user=request.user, description="Fallo FTP", table_name="reportes_commercialoperation")
            return Response({'message': "Error al conectarse al Servidor FTP"})
        except error_perm as e:
            TraceLog.objects.create(user=request.user, description="Fallo Ficheros", table_name="reportes_commercialoperation")
            return Response({'message': "No se pudo acceder al fichero o no se encuentra"})
        except psycopg2.Error as e:
            if isinstance(e, psycopg2.errors.UniqueViolation):
                return Response({'message': "Los datos ya fueron insertados"})
            TraceLog.objects.create(user=request.user, description="Fallo BD", table_name="reportes_commercialoperation")
            return Response({'message': "Ocurrio algun error al conectar a la Base de Datos"})
        # salva de traza
        TraceLog.objects.create(user=request.user, description="PostOK", table_name="reportes_commercialoperation")
        return Response({'message': "Se procesó la información"})
