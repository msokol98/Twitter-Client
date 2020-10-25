import React from 'react';
import Modal from './template';
import { SocialIcon } from 'react-social-icons';
import RetweetBox from '../tweet/forms/RetweetBox';

const RetweetModal = ({ tweet, show, setShow, submitRetweet }) => {

    const tweetData = tweet && tweet.props && tweet.props.tweet;

    const body = (
        <div>
            {tweet}
            <h4 className="title is-size-4" style={{color: "#00acee", margin: "30px 0"}}>
                Add a comment
            </h4>
            <RetweetBox submitRetweet={submitRetweet} />
        </div>
    )

    const header = (
        <div className="header">
            <SocialIcon url="http://twitter.com" />
            <h2 className="title" style={{color: "#00acee", marginLeft: "10px", marginBottom: "0"}}>
                {`Retweet ${tweetData.author}`}
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
            retweet={true}
        />
    )
}
 
export default RetweetModal;