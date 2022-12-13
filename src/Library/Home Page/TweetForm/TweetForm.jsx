import "./TweetForm.css";
import Button from "Components/Button/Button";
import Line from "Components/Line/Line";
import Error from "Components/Error/Error";
import useTweetForm from "Components/Hooks/useTweetForm";
import { useContext, useEffect } from "react";
import { TweetContext } from "Context/TweetContext";

const TweetForm = () => {
  const { isAddButtonDisabledOnFetch, isDisplayingOnlyMyTweets } =
    useContext(TweetContext);

  const {
    handleChange,
    handleOnKeyUp,
    displayError,
    charRemainingDisplay,
    clearForm,
    isButtonDisabled,
    setIsButtonDisabled,
    addTweet,
    tweetText,
  } = useTweetForm();

  useEffect(() => {
    validateTweet();
    //eslint-disable-next-line
  }, []);

  const validateTweet = () => {
    if (!tweetText) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <div className="tweet-form in">
      <form>
        <textarea
          type="text"
          className={
            !isDisplayingOnlyMyTweets ? "text-area" : "text-area my-tweets"
          }
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="What's on your mind?"
          onKeyUp={handleOnKeyUp}
          value={tweetText}
        ></textarea>
      </form>
      <Line>
        {displayError ? (
          <Error>The tweet can't contain more then 140 chars.</Error>
        ) : (
          ""
        )}
        <p className="small-note">
          Characters remaining: {charRemainingDisplay}/140
        </p>
        <Button
          handleClick={() => {
            addTweet();
            clearForm();
            validateTweet();
          }}
          buttonName={isButtonDisabled ? "Waiting..." : "Tweet"}
          disabled={isButtonDisabled}
          alsoDisabled={isAddButtonDisabledOnFetch}
        />
      </Line>
    </div>
  );
};

export default TweetForm;
