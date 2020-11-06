import React from 'react';
import "./styles.css";
import { getUsername, getTimestamp } from '../utils/tweetFormatter';

const Reply = ({ reply }) => {

    console.log(reply)

    return(
        <div className="reply">
            <div className='reply-meta-info'>
                <h2 className='has-text-weight-light title is-size-5 is-marginless'>
                    {reply.author}
                </h2>

                <h6 className='has-text-grey' style={{marginLeft: '10px'}}>
                    · {getTimestamp(reply.updatedAt)}
                </h6>
            </div>        
            
            <p>{reply.body}</p>
        </div>
    )
}
 
export default Reply;