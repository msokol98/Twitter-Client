import React, { useState } from 'react';
import './styles.css';

import ReplyBox from './forms/ReplyBox';
import EditBox from './forms/EditBox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faRetweet, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button';

import inModal from '../../utils/inModal';

const Tweet = ({ tweet, like, retweet, reply, remove, editTweet, showTweetModal, isRetweet }) => {

    const { author, username, body, likeCount, retweetCount, replyCount, timestamp, id, isLiked, type } = tweet;

    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const submitReply = theReply => {
       reply(0, theReply);
       setIsReplying(false);
    }

    const submitEditedTweet = (id, body) => {
        editTweet(id, body);
        setIsEditing(false);
    }

    const tweetInfo = [
        {
            icon: faComment,
            number: replyCount,
            onClick: () => setIsReplying(!isReplying)
        },
        {
            icon: faRetweet,
            number: retweetCount,
            onClick: () => !tweet.isMine && retweet(id)
        },  
        {
            icon: faHeart,
            color: isLiked ? "red" : "grey",
            number: likeCount,
            onClick: () => !tweet.isMine && like(id, isLiked ? 'unlike' : 'like')
        },  
        {
           icon: faShare,
           onClick: () => console.log("Sharing...")
        }  
    ];

    if(type === "retweet" && (!tweet.body || tweet.body === "")) {
        const parent = tweet.parent;
    }

    return ( 
        <div className='tweet'>

            <div className='tweet-info-top'>
                <div>
                    <h2 className='is-size-5 is-marginless has-text-dark'>{author}</h2>
                    <h6 className='has-text-grey'>{username}</h6>
                    <h6 className='has-text-grey'>· {timestamp}</h6>
                </div>

                <div>
                    {tweet.isMine && <Button className='has-text-grey see-replies' onClick={() => setIsEditing(true)} variant="link">Edit Tweet</Button>}
                    {!inModal() && <Button className='has-text-grey see-replies' onClick={showTweetModal} variant="link">See Replies</Button>}
                    {tweet.isMine && <Button className='has-text-grey' onClick={remove} variant="link">Delete</Button>}
                </div>
            </div>

            <p className='tweet-body'>{body}</p>

            {!isRetweet && <div className='tweet-info-bottom'>

                {tweetInfo.map((info, i) => (
                    <div key={i} onClick={info.onClick}>
                        <FontAwesomeIcon className='tweet-icon' color={info.color} style={{cursor: !tweet.isMine && "pointer"}} icon={info.icon} />
                        <h6 className='has-text-grey'>{info.number}</h6>
                    </div>
                ))}

            </div>}

            {isReplying && <ReplyBox submitReply={submitReply} /> }
            {isEditing && <EditBox id={id} tweet={body} submitEditedTweet={submitEditedTweet} /> }

        </div>
     );
}


export default Tweet;