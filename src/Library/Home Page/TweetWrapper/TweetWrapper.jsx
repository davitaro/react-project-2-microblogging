import "./TweetWrapper.css";
import TweetForm from "../TweetForm/TweetForm";
import TweetList from "../TweetList/TweetList";
import useTweetWrapper from "Components/Hooks/useTweetWrapper";
import Error from "Components/Error/Error";
import Line from "Components/Line/Line";
import Loader from "Components/Loader/Loader";
import { useRef } from "react";
import { TweetContext } from "Context/TweetContext";
import Button from "Components/Button/Button";
import useTweetForm from "Components/Hooks/useTweetForm";

const TweetWrapper = () => {
  const scroller = useRef(null);

  const { showServerError, background, serverErrorMessage } = useTweetForm();

  
  const {
    listOfTweets,
    displayLoader,
    isButtonDisabled,
    handleScroll,
    showMyTweets,
    isDisplayingOnlyMyTweets,
    showAllTweets,
    isDisplayingOnlySearchedTweets,
    showAllTweetsAfterSearch,
    // handleBackground,
  } = useTweetWrapper();

  return (
    <TweetContext.Provider
      value={{
        listOfTweets,
        isAddButtonDisabledOnFetch: isButtonDisabled,
        handleScroll,
        isDisplayingOnlyMyTweets,
        // handleBackground,
      }}
    >
      <div
        className={
          !isDisplayingOnlyMyTweets
            ? "tweet-wrapper"
            : "tweet-wrapper my-tweets"
        }
        ref={scroller}
        onScroll={() => {
          handleScroll(scroller);
        }}
      >
        <TweetForm />
        <Line center gap>
          {!isDisplayingOnlyMyTweets && (
            <Button
              buttonName="Show only my tweets"
              handleClick={showMyTweets}
              color="grad"
            />
          )}
          {isDisplayingOnlyMyTweets && !isDisplayingOnlySearchedTweets ? (
            <Button
              buttonName="Show All tweets"
              handleClick={showAllTweets}
              color="yellow"
            />
          ) : (
            ""
          )}
          {isDisplayingOnlySearchedTweets && (
            <Button
              buttonName="Show All tweets"
              handleClick={showAllTweetsAfterSearch}
              color="yellow"
            />
          )}

          {showServerError && <Error serverError>{serverErrorMessage}</Error>}
        </Line>
        {background ? <h1 className="background">{background}</h1> : ""}
        {listOfTweets.length ? (
          <TweetList />
        ) : (
          ""
        )}
        {displayLoader ? <Loader /> : ""}
      </div>
    </TweetContext.Provider>
  );
};

export default TweetWrapper;
