import React, { Component } from 'react';
import Tweets from './tweets/TweetsContainer';
import { SocialIcon } from 'react-social-icons';
import CreateTweet from '../components/create/CreateTweetContainer';
import axios from 'axios';
import { apiHost } from '../config';
import { getUsername, getTimestamp } from '../utils/tweetFormatter';

class Landing extends Component {

    state = {
        tweets: [],
        pageNumber: 0,
        hasMore: false,
        loading: true
    };

    fetchTweets = async () => {

        const limit = 20;

        this.setState({loading: true});
        const requests = [];
        
        for (let i = 0; i <= this.state.pageNumber; i++) 
            requests.push(axios.get(`${apiHost}/tweets`, { withCredentials: true, params: { skip: i * limit, limit }}))
        
        const responses = await Promise.all(requests);
        let data = [];
        responses.forEach(response => data = [...data, ...response.data])

        const lastResponseLength = responses[responses.length-1].data.length;
        this.setState({hasMore: lastResponseLength === limit});
        
        const tweets = data.map(tweet => {
                    return {...tweet, username: getUsername(tweet.author), timestamp: getTimestamp(tweet.createdAt)}
                });

        this.setState({loading: false, tweets: tweets})
    }

    componentDidMount() {this.fetchTweets()}

    render() {

        const { tweets, loading, hasMore } = this.state;

        return(
            <div>
                <div className="header">
                    <SocialIcon url="http://twitter.com" />
                    <h2 className="title" style={{color: "#00acee", marginLeft: "10px", marginBottom: "0"}}>
                        Twitter Clone for COMP 426
                    </h2>
                </div>

                <CreateTweet refresh={this.fetchTweets} />

                <Tweets 
                    tweets={tweets} 
                    incrementPageNumber={() => this.setState(prevState => {
                        return {
                            ...prevState,   
                            pageNumber: prevState.pageNumber + 1
                        }
                    }, this.fetchTweets)}
                    hasMore={hasMore}
                    loading={loading}
                    fetchTweets={this.fetchTweets}
                />
            </div>
        )
    }
}
 
export default Landing;
