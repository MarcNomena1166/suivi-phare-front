import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Message = (props) => {
    return (
        <div>
      <Modal show={props.data.etat} onHide={props.data.changeShow}>
        <Modal.Header closeButton>
        {props.data.status!==undefined && <Modal.Title>{props.data.status.status}</Modal.Title>}
        </Modal.Header>
        {props.data.status!==undefined && 
        <Modal.Body>
          <p>{props.data.status.message} </p>
            on line {JSON.stringify(props.data.status.ligne)}  
        </Modal.Body>} 
        <Modal.Footer>
          <Button variant="secondary" onClick={props.data.changeShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
};

export default Message;