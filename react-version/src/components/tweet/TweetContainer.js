import React, { useState } from 'react';
import Tweet from './Tweet';
import { apiHost } from '../../config';
import axios from 'axios';
import TweetModal from '../modal/tweetModal';
import RetweetModal from '../modal/retweetModal';
import DeleteWarning from '../modal/deleteWarning';

const TweetContainer = ({ tweet, refresh }) => {

    const [showTweetModal, setShowTweetModal] = useState(false);
    const [showRetweetModal, setShowRetweetModal] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const like = (id, type) => {
        axios.put(`${apiHost}/tweets/${id}/${type}`, null, {
            withCredentials: true
        }).then(() => refresh())
    }

    const retweet = body => {
        axios.post(`${apiHost}/tweets`, 
            {
                type: "retweet",
                parent: tweet.id,
                body
            }, 
            {
                withCredentials: true
            }
        ).then(() => refresh())
    }

    const reply = (id, reply) => {

        axios.post(`${apiHost}/tweets`, 
            {
                type: "reply",
                parent: id,
                body: ""
            }, 
            {
                withCredentials: true
            }
        )
    }

 
    const deleteTweet = id => {
        setShowDeleteWarning(false);

        axios.delete(`${apiHost}/tweets/${id}`, {
            withCredentials: true
        }).then(() => { refresh() })
    }

    const editTweet = (id, body) => {
        axios.put(`${apiHost}/tweets/${id}`, { body }, {withCredentials: true})
            .then(() => {
                refresh();
            })
            .catch(error => console.log(error))
    }

    const tweetProps =  {        
            tweet, 
            like, 
            retweet: () => setShowRetweetModal(true),
            reply, 
            remove: () => setShowDeleteWarning(true),
            editTweet,
            showTweetModal: () => setShowTweetModal(true)
    };

    const retweetProps = {...tweetProps, isRetweet: true};

    return(
        <>
            <Tweet {...tweetProps} />

            <TweetModal tweet={<Tweet {...tweetProps} />} show={showTweetModal} setShow={setShowTweetModal} />

            <RetweetModal 
                tweet={<Tweet {...retweetProps} />} 
                show={showRetweetModal}
                setShow={setShowRetweetModal}
                submitRetweet={retweet}
            />

            <DeleteWarning 
                deleteTweet={() => deleteTweet(tweet.id)}
                show={showDeleteWarning} 
                setShow={setShowDeleteWarning} 
            />

        </>
    )
}
 
export default TweetContainer;