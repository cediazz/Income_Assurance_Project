import React from 'react';
import { useState } from 'react'
import Loading from '../Loading/Loading'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MyALert from '../Alerts/Alerts'
import Button from 'react-bootstrap/Button';
import ChartYear from '../Chart/ChartYear';
import Alert from 'react-bootstrap/Alert';
import { useRef } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { Container } from 'react-bootstrap';
import SideBar from '../Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom';
import getIncomesByYear from './getIncomesByYear'

export default function TrendControlByYear() {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [year1, setYear1] = useState();
  const [year2, setYear2] = useState();
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

      let data = await getIncomesByYear(year1, year2)
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
                    <Form.Group className='p-2' as={Col} md="4" controlId="validationCustom01">
                      <Form.Label >Período de Búsqueda Desde:</Form.Label>
                      <Form.Control required max={year2} type="number" pattern='[0-9]{4}' onChange={e => setYear1(e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        seleccione un año valido
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='p-2' as={Col} md="4" controlId="validationCustom02">
                      <Form.Label >Hasta:</Form.Label>

                      <Form.Control required min={year1} type="number" pattern='[0-9]{4}' onChange={e => setYear2(e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        seleccione un año valido
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='p-2' as={Col} md="4" >
                      <Button variant="primary" style={{ position: "relative", top: 30, }} type="submit">Buscar</Button>
                    </Form.Group>
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
                <PDFExport ref={pdfExportComponent} fileName="Ingresos Anuales.pdf" >
                  <h3>Ingresos Anuales</h3>
                  <ChartYear data={data} ></ChartYear>
                </PDFExport>
              }
            </Col>
          </Row>
        </Container> : navigate('/Login')}
    </>
  );
}