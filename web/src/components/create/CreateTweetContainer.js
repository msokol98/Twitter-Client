import React from 'react';
import axios from 'axios';
import { apiHost } from '../../config';
import CreateTweet from './CreateTweet';

const CreateTweetContainer = ({ refresh }) => {

    const createTweet = tweet => {
        axios.post(`${apiHost}/tweets`, tweet, {
            withCredentials: true
        })
            .then(refresh)
            .catch(error => console.log(error))
    }

    return <CreateTweet createTweet={createTweet} />
}
 
export default CreateTweetContainer;