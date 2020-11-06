import React, { useRef, useCallback } from 'react'
import Tweet from '../tweet/TweetContainer';
import Loading from '../loading';

const Tweets = ({ tweets, loading, hasMore, incrementPageNumber, fetchTweets }) => {

    const observer = useRef();

    const lastTweetElementRef = useCallback(node => {

      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {

        if (entries[0].isIntersecting && hasMore) 
          incrementPageNumber();
        
      })

      if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return(
        <>
            {!tweets ? 
                <Loading />
            :
                tweets.map((tweet, i) => {
                    if (tweets.length === i + 1) {
                        return <div key={i} ref={lastTweetElementRef}><Tweet tweet={tweet} fetchTweets={fetchTweets} /></div>
                      } else {
                        return <div key={i}><Tweet tweet={tweet} fetchTweets={fetchTweets} /></div>
                    }
                })
            }
            {tweets && loading && <Loading />}
        </>
    )

}
 
export default Tweets;