import React, { useState } from 'react';
import './styles.css';

import ReplyBox from './forms/ReplyBox';
import EditBox from './forms/EditBox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faRetweet, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button';

import inModal from '../../utils/inModal';

import TweetContainer from './TweetContainer';

const Tweet = ({ tweet, like, retweet, reply, remove, editTweet, showTweetModal, amRetweeting, refresh, rtAndModal }) => {

    const { author, username, body, likeCount, retweetCount, replyCount, timestamp, id, isLiked, type, parent } = tweet;

    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const submitReply = theReply => {
       reply(id, theReply);
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
            onClick: () => setIsReplying(!isReplying),
            cursor: "pointer"
        },
        {
            icon: faRetweet,
            number: retweetCount,
            onClick: () => !tweet.isMine && retweet(id),
            cursor: !tweet.isMine && "pointer"
        },  
        {
            icon: faHeart,
            color: isLiked ? "red" : "grey",
            number: likeCount,
            onClick: () => !tweet.isMine && like(id, isLiked ? 'unlike' : 'like'),
            cursor: !tweet.isMine && "pointer"
        },  
        {
           icon: faShare,
           onClick: () => alert("Sharing tweet..."),
           cursor: "pointer"
        }  
    ];

    return ( 
        <div className='tweet'>

            <div className='tweet-info-top'>
                <div>
                    <h2 className='is-size-5 is-marginless has-text-dark'>{author}</h2>
                    <h6 className='has-text-grey'>{username}</h6>
                    <h6 className='has-text-grey'>· {timestamp}</h6>
                </div>

                {!inModal() && 
                
                    <div>
                        {tweet.isMine && <Button className='has-text-grey see-replies' onClick={() => setIsEditing(!isEditing)} variant="link">Edit Tweet</Button>}
                        {<Button className='has-text-grey see-replies' onClick={showTweetModal} variant="link">See More</Button>}
                        {tweet.isMine && <Button className='has-text-grey' onClick={remove} variant="link">Delete</Button>}
                    </div>
                    
                }
            </div>

            {type === "retweet" && 
                <h6 className="has-text-grey">
                    <span style={{marginRight: "5px"}}>
                        <FontAwesomeIcon className='tweet-icon' color="grey" icon={faRetweet}/>
                    </span>
                    Retweeted
                </h6>
                }

            <p className='tweet-body'>{body}</p>

            {type === "retweet" && parent && <TweetContainer tweet={parent} refresh={refresh} amRetweeting={true} />}

            {(!amRetweeting || rtAndModal) && <div className='tweet-info-bottom'>

                {tweetInfo.map((info, i) => (
                    <div key={i} onClick={info.onClick}>
                        <FontAwesomeIcon className='tweet-icon' color={info.color} style={{cursor: info.cursor}} icon={info.icon} />
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