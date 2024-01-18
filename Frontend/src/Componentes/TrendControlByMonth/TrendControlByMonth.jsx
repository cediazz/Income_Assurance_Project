import React from 'react';
import { useState } from 'react'
import Loading from '../Loading/Loading'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MyALert from '../Alerts/Alerts'
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import ChartMonth from '../Chart/ChartMonth';
import Alert from 'react-bootstrap/Alert';
import SideBar from '../Sidebar/Sidebar'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFExport } from '@progress/kendo-react-pdf';
import getIncomesByMonth from './getIncomesByMonth'

export default function TrendControlByMonth() {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [year, setYear] = useState();
  const [message, setMessage] = useState();
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const pdfExportComponent = useRef(null)

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setData()
    setMessage()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      setValidated(true);
    }
    else {
      setLoading(true)
      let data = await getIncomesByMonth(year)
      if (data.length)
        setData(data)
      else setMessage(data)
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
                    <Form.Label>Escoga el año</Form.Label>
                    <Form.Group className='p-2' as={Col} md="4" controlId="validationCustom01">
                      <Form.Control required type="number" min={1999} onChange={e => setYear(e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccione un año desde 1999 en adelante
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='p-2' as={Col} md="4" >
                      <Button variant="primary" type="submit">Enviar</Button>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className='p-2' as={Col} md="4" >
                      {data && <Button variant="primary" onClick={handleExportWithComponent}>Exportar a PDF</Button>}
                    </Form.Group>
                  </Row>

                </Form>
              </Row>
              {error && <MyALert message={error}></MyALert>}
              <div style={{ textAlign: "center" }}>{loading && <Loading></Loading>}</div>
              {message && 
              <Alert variant="danger" className="d-none d-lg-block">
                {message.message ? message.message : message.detail}
                </Alert>
              }
              {data &&
                <PDFExport ref={pdfExportComponent} fileName="Ingresos Mensuales.pdf" >
                  <h3>Ingresos Mensuales {year}</h3>
                  <ChartMonth data={data} ></ChartMonth>
                </PDFExport>}
            </Col>
          </Row>
        </Container> : navigate('/Login')}
    </>
  );
}