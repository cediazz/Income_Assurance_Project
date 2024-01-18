import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit';

function Loading(props){
    return(
        <MDBSpinner className='me-2' color='primary' style={{ width: '3rem', height: '3rem' }}>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
}
export default Loading