import React, { useState, useEffect } from 'react';
import Modal from './template';
import Reply from '../../reply';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';
import { apiHost } from '../../config';

const TweetModal = ({ tweet, show, setShow }) => {

    const tweetData = tweet && tweet.props && tweet.props.tweet;
    const [replies, setReplies] = useState();

    useEffect(() => {

        const id = tweet.props.tweet.id;

        axios.get(`${apiHost}/tweets/${id}`, {
            withCredentials: true
        }).then(res => {
            const tweet = res.data;
            setReplies(tweet.replies);
        })
    }, []);

    const body = (
        <div>
            {tweet}
            <h3 style={{color: "#00acee"}}>Replies</h3>
            {replies && 
                replies.map((reply, i) => 
                    <Reply key={i} reply={reply} tweeter={tweetData.username} />)
            }
        </div>
    )

    const header = (
        <div className="header">
            <SocialIcon url="http://twitter.com" />
            <h2 className="title" style={{color: "#00acee", marginLeft: "10px", marginBottom: "0"}}>
                {`Tweet from ${tweetData.author}`}
            </h2>
        </div>
    )

    return(
        <Modal
            header={header}
            body={body}
            show={show} 
            setShow={setShow}
            size="lg"
        />
    )
}
 
export default TweetModal;