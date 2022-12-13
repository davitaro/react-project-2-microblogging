import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "firebase.config";
import { collection, query, getDocs, where } from "firebase/firestore";

const useApp = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [listOfTweets, setListOfTweets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [isDisplayingOnlyMyTweets, setIsDisplayingOnlyMyTweets] =
    useState(false);
  const [isDisplayingOnlySearchedTweets, setIsDisplayingOnlySearchedTweets] =
    useState(false);
  const [userObject, setUserObject] = useState({});

  //set user to new signed in user
  onAuthStateChanged(auth, (fireuser) => {
    if (fireuser) {
      //user is signed
      setIsSignedIn(true);
      setUserObject(fireuser);
    } else {
      //user is signed out
      setIsSignedIn(false);
      setUserObject("");
    }
  });

  const searchUser = async () => {
    const tweetsRef = collection(db, "tweetsfeed");
    const q = query(
      tweetsRef,
      where("userKeywords", "array-contains", searchText)
    );
    const querySnapshot = await getDocs(q);
    const usersTweets = [];
    querySnapshot.forEach((item) => {
      usersTweets.push(item.data());
    });
    setListOfTweets([...usersTweets]);
    setIsDisplayingOnlySearchedTweets(true);
  };

  const searchContent = async () => {
    const tweetsRef = collection(db, "tweetsfeed");
    const q = query(tweetsRef, where("keywords", "array-contains", searchText));
    const querySnapshot = await getDocs(q);
    const contentTweets = [];
    querySnapshot.forEach((item) => {
      contentTweets.push(item.data());
    });
    setListOfTweets([...contentTweets]);
    setIsDisplayingOnlySearchedTweets(true);
  };

  return {
    userObject,
    isSignedIn,
    setIsSignedIn,
    listOfTweets,
    setListOfTweets,
    isDisplayingOnlyMyTweets,
    setIsDisplayingOnlyMyTweets,
    isDisplayingOnlySearchedTweets,
    setIsDisplayingOnlySearchedTweets,
    searchText,
    setSearchText,
    radioValue,
    setRadioValue,
    searchContent,
    searchUser,
  };
};

export default useApp;
