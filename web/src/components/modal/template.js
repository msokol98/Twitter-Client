import React from 'react';
import { Modal, Button } from "react-bootstrap";
import closeModal from '../../utils/closeModal';

const ModalTemplate = ({ show, header, body, setShow, warning, size, retweet }) => {

    if(show) {
        document.documentElement.setAttribute("style", "overflow: hidden");
        document.getElementsByTagName("BODY")[0].setAttribute("style", "overflow: hidden");
    }

    return(
        <Modal style={{zIndex: '100000'}} size={size} show={show} onHide={() => closeModal(setShow)}>
            <Modal.Header closeButton>
                <Modal.Title style={{color: warning ? "red" : "#00acee"}}>{header}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{body}</Modal.Body>

            {!warning && !retweet && 
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal(setShow)}>
                        Close
                    </Button>
                </Modal.Footer>
            }
        </Modal>
    )
}
  
export default ModalTemplate;