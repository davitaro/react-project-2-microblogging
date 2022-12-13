import { TweetContext } from "Context/TweetContext";
import { useContext, useCallback, useState } from "react";
import Tweet from "../Tweet/Tweet";
import "./TweetList.css";

const compareTweets = (a, b) => {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
};

const TweetList = () => {
  const { listOfTweets } = useContext(TweetContext);
  const [tweetCount, setTweetCount] = useState(0);

  const getTweetCount = useCallback(() => {
    setTweetCount(tweetCount + 1);
    console.log(tweetCount);
  }, [tweetCount]);

  listOfTweets.sort(compareTweets);

  return (
    <div className="tweet-list">
      {listOfTweets.map((tweet) => {
        return (
          <Tweet
            key={tweet.date}
            id={tweet.id}
            text={tweet.content}
            date={tweet.date}
            profile={tweet.profileImageSource}
            displayName={tweet.displayName}
            getTweetCount={getTweetCount}
            // tweetCount={tweetCount}
          />
        );
      })}
    </div>
  );
};

export default TweetList;
