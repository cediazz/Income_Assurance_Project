import React from 'react';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './sidebars.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import etecsa_logo from './etecsa_logo.jpg'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading'
import MyModal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom';
import ProcessInformation from './ProcessInformation';

function Sidebar() {
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    

    useEffect(() => {
        if(!localStorage.getItem('access'))
        navigate('/Login');
      }, []);

    const handleSubmit = async () => {
        setLoading(true)
        setMessage()
        
            let data = await ProcessInformation()
            setMessage(data)
            setLoading(false)
          
        
      }

      const Logout = () =>{
        localStorage.clear()
         
      }

    return (
        <>
            
            <div className="flex-shrink-0 p-3  bg-light MySideBar " >
                <div className="d-flex align-items-center pb-3 mb-3   border-bottom">
                    <img className="bi me-2" src={etecsa_logo} />
                </div>
                <ul className="list-unstyled ps-0  " >
                    <li className="mb-1">
                        <Link to="/rateControl" className="btn btn-toggle align-items-center rounded " style={{ color: 'blue' }}>
                            Control de Tarifa
                        </Link>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded " style={{ color: 'blue' }} data-bs-toggle="collapse" data-bs-target="#dashboard-collapse1" aria-expanded="false">
                            Control de Tendencia
                        </button>
                        <div className="collapse" id="dashboard-collapse1">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <Link to="/trendControl" className="link-dark rounded">Ingresos Diarios</Link>
                                <Link to="/trendControlByMonth" className="link-dark rounded">Ingresos Mensuales</Link>
                                <Link to="/trendControlByYear" className="link-dark rounded">Ingresos Anuales</Link>
                            </ul>
                        </div>
                    </li>
                    <li className="border-top my-3">
                        <div className='mt-3'>
                        <Button variant="outline-primary" size="lg" onClick={handleSubmit}>Procesar la información</Button>
                        <div className='mt-3' style={{ textAlign: "center" }}>{loading && <Loading></Loading>}</div>
                        {message && <MyModal message={message.message ? message.message : navigate('/Login')}></MyModal> }
                        </div>
                    </li>
                    <li className="mb-1 border-top">
                        <button className="btn btn-toggle align-items-center rounded mt-3 " style={{ color: 'blue' }} data-bs-toggle="collapse" data-bs-target="#dashboard-collapse2" aria-expanded="false">
                            Usuario: {localStorage.getItem('username')}
                        </button>
                        <div className="collapse" id="dashboard-collapse2">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <Link to="/Login" onClick={Logout} className="link-dark rounded">Salir</Link>
                                
                            </ul>
                        </div>
                    </li>
                </ul>
         </div>
         </>
    );
};

export default Sidebar