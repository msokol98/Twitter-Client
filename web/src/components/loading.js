import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
    <Spinner variant="primary" animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>
)
 
export default Loading;