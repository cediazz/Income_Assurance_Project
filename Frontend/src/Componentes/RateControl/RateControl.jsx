import React from 'react';
import { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import Table from '../Table Commercial Operations/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MyALert from '../Alerts/Alerts'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import SideBar from '../Sidebar/Sidebar'
import { Container } from 'react-bootstrap';
import getCommercialOperations from './getCommercialOperations'
import getCommercialOfficeProvince from './getCommercialOfficeProvince'
import MyPagination from '../Pagination/Pagination';


export default function RateControl() {

  const [data, setData] = useState()
  const [provinces, setProvinces] = useState([])
  const [loading, setLoading] = useState(false)
  const [dateSelected, setDateSelected] = useState();
  const [provinceSelected, setprovinceSelected] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [message, setMessage] = useState();
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  
  const itemsPerPage = 2;

  const handleSubmit = async (event) => {
    event.preventDefault()
    setData()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      setValidated(true);
    }
    else {
      setLoading(true)
      let data = await getCommercialOperations(dateSelected, provinceSelected)
      setLoading(false)
      if (data.detail) 
      setMessage(data.detail)
      else  if (data.count != 0) {
        setData(data)
        setMessage()
        setPageCount(Math.ceil(data.count / itemsPerPage))
      }
      else setMessage("No se encontraron resultados")
     
     
      setLoading(false)
      

    }
  }

  useEffect(() => {
    const getProvinces = async () => {
      setLoading(true)
      let data = await getCommercialOfficeProvince()
      setProvinces(data)
      setLoading(false)

    }
    getProvinces()
  }, [])

  return (
    <div>
      {localStorage.getItem('access') ?
        <Container fluid >
          <Row>
            <Col md={3} className="p-0"><SideBar></SideBar></Col>

            <Col md={9}>
              <Row className="mt-5 justify-content-md-center">
                <Form noValidate  validated={validated} onSubmit={handleSubmit} >
                 
                  <Row className="mb-3" >
                    <Form.Group className='p-2' as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Escoga una fecha</Form.Label>
                      <Form.Control required type="date" onChange={e => setDateSelected(e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccione una fecha
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='p-2' as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Provincia</Form.Label>
                      <Form.Select required onChange={e => setprovinceSelected(e.target.value)} >
                        <option selected disabled value="">Seleccione la Provincia </option>
                        {provinces.map((index) => <option >{index.office_province}</option>)}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccione una Provincia
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4 pt-3' as={Col} md="4" >
                      <Button variant="primary" type="submit">Buscar</Button>
                    </Form.Group>
                  </Row>
                </Form>
                {message && <MyALert message={message}></MyALert>}
              </Row>
              <Row><div className='mb-4' style={{ textAlign: "center" }}>{loading && <Loading></Loading>}</div></Row>

              {data  &&
                <>
                  <Row>
                    <Form.Group as={Col} md="1">
                      <Form.Label>Páginas:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                      <MyPagination cantPag={pageCount} date={dateSelected} province={provinceSelected} setData={setData} setLoading={setLoading} ></MyPagination>
                    </Form.Group>
                  </Row>
                  <Row className="mt-3">
                     <Table data={data.results}></Table>
                  </Row>
                </>
              }
            </Col>
          </Row>
          {data && data.detail}
        </Container>
        : navigate('/Login')}</div>

  );
}