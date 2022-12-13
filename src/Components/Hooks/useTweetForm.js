import { useState, useContext, useCallback } from "react";
// import { TweetContext } from "Context/TweetContext";
import { collection, addDoc } from "firebase/firestore";
import db from "firebase.config";
import { UserContext } from "Context/UserContext";

const useTweetForm = () => {
  const [showServerError, setShowServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [charRemaining, setCharRemaining] = useState(140);
  const [charRemainingDisplay, setCharRemainingDisplay] = useState(140);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [id, setId] = useState("");
  const [tweetText, setTweetText] = useState("");
  const [background, setBackground] = useState("");

  // const { handleBackground } = useContext(TweetContext);
  const { userObject } = useContext(UserContext);

  const handleChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleOnKeyUp = (event) => {
    const newDiff = parseInt(140 - event.target.value.length);
    setCharRemaining(newDiff);
    setCharRemainingDisplay(newDiff);
    if (charRemaining <= 0) {
      setCharRemainingDisplay(0);
    }

    newDiff < 0 ? handleError() : handleNoError();
  };

  const clearForm = () => {
    setTweetText("");
    setCharRemainingDisplay(140);
  };

  const handleError = () => {
    setDisplayError(true);
    setIsButtonDisabled(true);
  };

  const handleNoError = () => {
    setDisplayError(false);
    setIsButtonDisabled(false);
  };

  const addTweetToServer = useCallback(
    async ({ content, userName, date, keywords, userKeywords }) => {
      try {
        await addDoc(collection(db, "tweetsfeed"), {
          content: content,
          userName: userName,
          displayName: userObject.displayName || userObject.email,
          date: date,
          userID: userObject.uid,
          profileImageSource: userObject.photoURL,
          keywords: keywords,
          userKeywords: userKeywords,
        });

        setShowServerError(false);
        setIsButtonDisabled(false);
        setServerErrorMessage("");
      } catch (error) {
        setShowServerError(true);
        setServerErrorMessage(
          `Warning: Your tweet has not been added to the server. ${error.message}.`
        );
        setIsButtonDisabled(false);
      }
    },
    [
      userObject.displayName,
      userObject.email,
      userObject.photoURL,
      userObject.uid,
    ]
  );

  // const splitAllWays = (result, left, right) => {
  //   result.push(left.concat(right));
  //   if (right.length > 1) {
  //     for (let i = 1; i < right.length; i++) {
  //       splitAllWays(
  //         result,
  //         left.concat(right.substring(0, i)),
  //         right.substring(i)
  //       );
  //     }
  //   }
  //   return result;
  // };

  const addTweet = async () => {
    setIsButtonDisabled(true);
    const date = new Date();
    const currentDate = date.toISOString();
    setId(currentDate);

    const keywords = tweetText.split(" ");

    const checkDisplayName = () => {
      if (!userObject.displayName) {
        return userObject.email;
      }
      return userObject.displayName;
    };

    const emailKeywords = userObject.email.split("@");
    const displayNameKeywords = checkDisplayName().split("");
    const userKeywords = [
      ...displayNameKeywords,
      ...emailKeywords,
      userObject.displayName,
      userObject.email,
    ];

    const newTweet = {
      userName: userObject.uid,
      content: tweetText,
      id: id,
      date: currentDate,
      keywords: keywords,
      userKeywords: userKeywords,
    };
    await addTweetToServer(newTweet);
    // handleBackground([1]);
  };

  return {
    handleChange,
    handleOnKeyUp,
    displayError,
    charRemainingDisplay,
    clearForm,
    isButtonDisabled,
    setIsButtonDisabled,
    setBackground,
    background,
    addTweet,
    tweetText,
    serverErrorMessage,
    showServerError,
  };
};

export default useTweetForm;
