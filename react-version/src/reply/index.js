import React from 'react';
import "./styles.css";

const Reply = ({ reply, tweeter }) => (
    <div className="reply">
        <div className='reply-meta-info'>
            <h2 className='title is-size-5 is-marginless'>{reply.name}</h2>
            <h6 className='has-text-grey' style={{marginLeft: '10px'}}>Replying to {tweeter}</h6>
            <h6 className='has-text-grey' style={{marginLeft: '10px'}}>· 4m</h6>
        </div>        
        
        <p>{reply.payload}</p>
    </div>
)
 
export default Reply;