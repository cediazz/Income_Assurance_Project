from ftplib import FTP, error_perm
import csv
import os
import psycopg2


def download_information():
    try:
        # Conectar al servidor FTP
        ftp = FTP('localhost')
        ftp.login(user='carftp', passwd='ce77')
        # Crear fichero de Operaciones Comerciales y escribirlo
        with open('/home/carlos/Escritorio/Comercial_Operations.csv', 'wb') as f:
            # descargar un archivo binario desde un servidor FTP. Se utiliza el comando
            # "RETR" seguido del nombre de archivo para recuperar el archivo.
            ftp.retrbinary('RETR /home/carftp/Comercial_OperationsFTP.csv', f.write)
        # Cerrar la conexión FTP
        ftp.quit()
    except ConnectionRefusedError as e:
        raise e
    except error_perm as e:
        raise e


def read_csv():
    data = []
    csv_file = open("/home/carlos/Escritorio/Comercial_Operations.csv", "r")
    csv_reader = csv.reader(csv_file)
    csv_reader.__next__()  # Realizamos una iteracion para saltarnos la 1 fila

    for line in csv_reader:
        print(type(line[12]))
        data.append({
            "Venta": {'id': line[0], 'fecha': line[1], 'cant_oper': int(line[11]),
                      'mont-cobrado': float(line[12]), "id_ofic_comerc": line[2], "id_cliente": line[5],
                      "id_serv": line[8]},
            "OficComer": {'id': line[2], 'nombre_ofic': line[3], "provincia": line[4]},
            "Cliente": {"id": line[5], "tipo": line[6], "nombre": line[7]},
            "Servicio": {"id": line[8], "nombre_serv": line[9], "tarifa": float(line[10])}
        })
    return data



def insert_data(data):
    conexion = None
    try:
        conexion = psycopg2.connect(host="localhost", port="5432", database="proyecto_etecsa", user="carlos",
                                    password="carlos")

        cursor = conexion.cursor()
        for line in data:
            # Consulta para verificar si existe la oficina comercial
            cursor.execute("SELECT * FROM public.reportes_commercialoffice where office_id=%s",
                           (line['OficComer']['id'],))
            commercial_office = cursor.fetchone()
            if commercial_office is None:  # Si no existe entonces se inserta
                cursor.execute(
                    "INSERT INTO public.reportes_commercialoffice(office_id, office_name, office_province)"
                    "VALUES(%s,%s,%s)",
                    (line['OficComer']['id'], line['OficComer']['nombre_ofic'], line['OficComer']['provincia']))

            cursor.execute("SELECT * FROM public.reportes_customer where customer_id=%s", (line['Cliente']['id'],))
            customer = cursor.fetchone()
            if customer is None:
                cursor.execute(
                    "INSERT INTO public.reportes_customer(customer_id, customer_type, customer_name)VALUES(%s,%s,%s)",
                    (line['Cliente']['id'], line['Cliente']['tipo'], line['Cliente']['nombre']))

            cursor.execute("SELECT * FROM public.reportes_service where service_id=%s", (line['Servicio']['id'],))
            service = cursor.fetchone()
            if service is None:
                cursor.execute(
                    "INSERT INTO public.reportes_service(service_id, service_name, service_price)VALUES(%s,%s,%s)",
                    (line['Servicio']['id'], line['Servicio']['nombre_serv'], line['Servicio']['tarifa']))

            cursor.execute(
                "INSERT INTO public.reportes_commercialoperation(id, date, number_operations, amount_collected, customer_id, commercial_office_id, service_id)VALUES (%s,%s,%s,%s,%s,%s,%s)",
                (line['Venta']['id'], line['Venta']['fecha'], line['Venta']['cant_oper'], line['Venta']['mont-cobrado'],
                 line['Venta']['id_cliente'], line['Venta']['id_ofic_comerc'], line['Venta']['id_serv']))

        conexion.commit()
        cursor.close()
    except psycopg2.Error as e:
        if conexion is not None:
            conexion.rollback()
        raise e

