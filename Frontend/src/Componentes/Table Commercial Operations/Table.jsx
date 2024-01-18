import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function Table(props) {
  return (
    <MDBTable hover bordered borderColor="primary" responsive small align="middle" className='caption-top' >
      <caption>Operaciones Comerciales</caption>
      <MDBTableHead dark >
        <tr>
          <th>Oficina Comercial</th>
          <th>Provincia Oficina Comercial</th>
          <th>Tipo de Cliente</th>
          <th>Cliente</th>
          <th>Servicio</th>
          <th>Precio Servicio</th>
          <th>Cantidad de Operaciones</th>
          <th>Monto a Cobrar</th>
          <th style={{width:'100%'}} scope='col'>Monto Cobrado    </th>
          <th>MontoCobrado/CantOper</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {props.data && props.data.map((e) =>
        <tr>
          <td>{e.commercial_office.office_name}</td>
          <td>{e.commercial_office.office_province}</td>
          <td>{e.customer.customer_type}</td>
          <td>{e.customer.customer_name}</td>
          <td>{e.service.service_name}</td>
          <td>{"$" + e.service.service_price}</td>
          <td>{e.number_operations}</td>
          <td>{"$" + e.actual_amount}</td>
          <td className={e.actual_amount < e.amount_collected || e.actual_amount > e.amount_collected?'text-danger':'text-success'}>
            {"$" + e.amount_collected} 
            </td>
          <td className={e.amount_cant < e.service.service_price || e.amount_cant > e.service.service_price?'text-danger':'text-success'}>
            {"$" + e.amount_cant}
            </td>
        </tr>)}
      </MDBTableBody>
    </MDBTable>
  );
}