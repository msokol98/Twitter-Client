import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiHost } from '../config';
import { getUsername, getTimestamp } from '../utils/tweetFormatter';

const useFetchTweets = (pageNumber) => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tweets, setTweets] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const fetchTweets = () => {
    setLoading(true);
    setError(false);

    axios({
      method: 'GET',
      url: `${apiHost}/tweets`,
      params: { skip: pageNumber * 50 },
      withCredentials: true,
    }).then(response => {

      const newTweets = response.data;

      setTweets(oldTweets => {
        const newTweets = response.data.map(tweet => {
            return {...tweet, username: getUsername(tweet.author), timestamp: getTimestamp(tweet.createdAt)}
        });

        return [...new Set([...oldTweets, ...newTweets])];
      });

      setHasMore(newTweets.length > 0);
      setLoading(false);

    }).catch(e => {
      setError(true);
    })
  }

  useEffect(fetchTweets, [pageNumber])

  return { loading, error, tweets, hasMore }
}

export default useFetchTweets;