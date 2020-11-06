import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import { apiHost } from '../../config';
import axios from 'axios';
import TweetModal from '../modal/tweetModal';
import RetweetModal from '../modal/retweetModal';
import DeleteWarning from '../modal/deleteWarning';
import closeModal from '../../utils/closeModal';
import { getUsername, getTimestamp } from '../../utils/tweetFormatter';

const TweetContainer = ({ tweet, amRetweeting, fetchTweets }) => {

    const [showTweetModal, setShowTweetModal] = useState(false);
    const [showRetweetModal, setShowRetweetModal] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [theTweet, setTheTweet] = useState({...tweet});

    useEffect(() => setTheTweet({...tweet}), [tweet]);
    useEffect(() => setTheTweet({...tweet}), []);

    const refresh = id => {
        axios.get(`${apiHost}/tweets/${id}`, {
            withCredentials: true
        }).then(response => {
            const tweetResponse = response.data;
            let tweet = {...tweetResponse, username: getUsername(tweetResponse.author), timestamp: getTimestamp(tweetResponse.createdAt)};

            if(tweet.parent)
                tweet.parent.parent = null

            setTheTweet(tweet);
        })
    }

    const like = (id, type) => {
        axios.put(`${apiHost}/tweets/${id}/${type}`, null, {
            withCredentials: true
        }).then(() => refresh(id))
    }

    const retweet = (id, body) => {
        closeModal(setShowRetweetModal);

        axios.post(`${apiHost}/tweets`, 
            {
                type: "retweet",
                parent: tweet.id,
                body
            }, 
            {
                withCredentials: true
            }
        ).then(fetchTweets)
    }

    const reply = (id, reply) => {
        axios.post(`${apiHost}/tweets`, 
            {
                type: "reply",
                parent: id,
                body: reply
            }, 
            {
                withCredentials: true
            }
        ).then(() => refresh(id))
    }

 
    const deleteTweet = id => {
        setShowDeleteWarning(false);

        axios.delete(`${apiHost}/tweets/${id}`, {
            withCredentials: true
        }).then(fetchTweets)
    }

    const editTweet = (id, body) => {
        axios.put(`${apiHost}/tweets/${id}`, { body }, {withCredentials: true})
            .then(() => {
                refresh(id);
            })
            .catch(error => console.log(error))
    }

    const tweetProps =  {        
            tweet: theTweet, 
            like, 
            retweet: () => setShowRetweetModal(true),
            reply, 
            remove: () => setShowDeleteWarning(true),
            editTweet,
            showTweetModal: () => setShowTweetModal(true),
            refresh,
            amRetweeting
    };

    const retweetProps = {...tweetProps, amRetweeting: true};
    const tweetModalProps = {...tweetProps, rtAndModal: true}

    if(!theTweet) return <></>

    return(
        <>
            <Tweet {...tweetProps} />

            <TweetModal tweet={<Tweet {...tweetModalProps} />} show={showTweetModal} setShow={setShowTweetModal} />

            <RetweetModal 
                tweet={<Tweet {...retweetProps} />} 
                show={showRetweetModal}
                setShow={setShowRetweetModal}
                id={tweet.id}
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