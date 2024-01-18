import React from 'react';
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Loading from '../Loading/Loading'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MyALert from '../Alerts/Alerts'
import Button from 'react-bootstrap/Button';
import Chart from '../Chart/Chart';
import Alert from 'react-bootstrap/Alert';
import { useRef } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import SideBar from '../Sidebar/Sidebar'
import getCommercialOperationsIncomes from './getCommercialOperationsIncomes'

export default function TrendControl() {

  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [validated, setValidated] = useState(false);
  /* El hook useRef de React es una herramienta útil para crear y manipular referencias a 
  elementos del DOM en una aplicación de React. Una referencia es simplemente una forma de 
  obtener acceso a un elemento específico en el DOM, y puede ser utilizada para modificar 
  su comportamiento o estilo*/
  const pdfExportComponent = useRef(null)
  const navigate = useNavigate();

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setData("")
    const form = event.currentTarget;

    if (form.checkValidity() === false) {

      event.stopPropagation();
      setValidated(true);
    }

    else {
      setLoading(true)
      let data = await getCommercialOperationsIncomes(date1, date2)
      setData(data)
      setLoading(false)
      setError(null)


    }
  }


  return (
    <>
      {localStorage.getItem('access') ?
        <Container fluid >
          <Row>
            <Col md={3} className="p-0"><SideBar></SideBar></Col>
            <Col md={9}>
              <Row className="mt-5 justify-content-md-center">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3" >
                    <Form.Group className='p-2' as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Período de Búsqueda Desde:</Form.Label>
                      <Form.Control type="date" max={date2} onChange={e => setDate1(e.target.value)} required />
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccione una fecha correcta
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='p-2' as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Hasta:</Form.Label>
                      <Form.Control type="date" min={date1} onChange={e => setDate2(e.target.value)} required />
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccione una fecha correcta
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='p-2' as={Col} md="4" >
                      <Button variant="primary" style={{ position: "relative", top: 30, }} type="submit">Buscar</Button>
                    </Form.Group>
                    <Form.Group className='p-2' as={Col} md="4" >
                      {data.by_day && <Button variant="primary" onClick={handleExportWithComponent}>Exportar a PDF</Button>}
                    </Form.Group>
                  </Row>

                </Form>
              </Row>
              {error && <MyALert message={error}></MyALert>}
              {data.message && <MyALert message={data.message}></MyALert>}
              {data.detail && <MyALert message={data.detail}></MyALert>}
              <div style={{ textAlign: "center" }}>{loading && <Loading></Loading>}</div>
              {data.by_day &&
                <PDFExport ref={pdfExportComponent} fileName="Ingresos Diarios.pdf" >
                  <Chart data={data.by_day}></Chart>
                  <Alert variant={data.total_collected != data.total_real ? "danger" : "primary"} className="d-none d-lg-block">Total cobrado:${data.total_collected}</Alert>
                  <Alert variant="primary" className="d-none d-lg-block">Total a cobrar:${data.total_real}</Alert>
                </PDFExport>}
            </Col>
          </Row>
        </Container> : navigate('/Login')}

    </>
  );
}