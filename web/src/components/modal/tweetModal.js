import React from 'react';
import Modal from './template';
import Reply from '../../reply';
import { SocialIcon } from 'react-social-icons';

const TweetModal = ({ tweet, show, setShow }) => {

    const tweetData = tweet && tweet.props && tweet.props.tweet;

    const body = (
        <div>
            {tweet}
            <h3 style={{color: "#00acee"}}>Replies</h3>
            {/* {tweetData.replies.map((reply, i) => <Reply key={i} reply={reply} tweeter={tweetData.username} />)} */}
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