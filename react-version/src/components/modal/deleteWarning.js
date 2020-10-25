import React from 'react';
import Modal from './template';
import Button from 'react-bootstrap/Button';
import closeModal from '../../utils/closeModal';

const DeleteWarning = ({ deleteTweet, id, show, setShow }) => (

    <Modal
        header="Warning"
        body={    
        
            <div style={{padding: "10px"}}>

                <h5>Are you sure you want to delete this tweet?</h5>

                <br />

                <div style={{display: "flex"}}>
                    <Button onClick={() => { closeModal(setShow); deleteTweet(id) }} style={{marginRight: "10px"}} variant="danger">Yes</Button>
                    <Button onClick={() => closeModal(setShow)} variant="secondary">Cancel</Button>
                </div>    
            </div>

        }
        show={show} 
        setShow={setShow}
        warning={true}
        size="md"
    />
)
 
export default DeleteWarning;