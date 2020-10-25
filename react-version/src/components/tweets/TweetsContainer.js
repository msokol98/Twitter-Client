import React from 'react';
import Tweets from './Tweets';

const TweetsContainer = ({ tweets, fetchTweets, hasMore, loading, incrementPageNumber  }) => {

    return(
        <>
            <h4 className="title is-size-4" style={{color: "#00acee", margin: "30px 0"}}>
                What's Happening
            </h4>
            <Tweets tweets={tweets} refresh={fetchTweets} hasMore={hasMore} loading={loading} incrementPageNumber={incrementPageNumber} />
        </>
    )
}


export default TweetsContainer;