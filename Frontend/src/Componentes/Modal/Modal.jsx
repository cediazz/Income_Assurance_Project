import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

function MyModal(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{backgroundColor:"#17a2b8"}} closeButton>Resultado</Modal.Header>
        <Modal.Body>
          <Alert variant="info">{props.message}</Alert>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;