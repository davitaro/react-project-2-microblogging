import { useState, useEffect, useCallback } from "react";
import db from "firebase.config";
import {
  collection,
  startAfter,
  orderBy,
  limit,
  query,
  getDocs,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "Context/UserContext";
import { TweetsListContext } from "Context/TweetsListContext";
import useTweetForm from "./useTweetForm";
import TweetList from "Library/Home Page/TweetList/TweetList";

const useTweetWrapper = () => {
  const { userObject } = useContext(UserContext);
  const {
    listOfTweets,
    setListOfTweets,
    isDisplayingOnlyMyTweets,
    setIsDisplayingOnlyMyTweets,
    isDisplayingOnlySearchedTweets,
    setIsDisplayingOnlySearchedTweets,
  } = useContext(TweetsListContext);

  const { setBackground } = useTweetForm();

  const [displayLoader, setDisplayLoader] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoadMoreButtonDisabled, setIsLoadMoreButtonDisabled] =
    useState(false);
  const [lastVisible, setLastVisible] = useState("" || null);
  // const [triggerHeight, setTriggerHeight] = useState(0);

  // const handleBackground = useCallback(
  //   (list) => {
  //     if (list.length === 0) {
  //       setBackground("No tweets yet! Use the form above to start tweeting 🐤");
  //     } else {
  //       setBackground("");
  //     }
  //   },
  //   [setBackground]
  // );

  const getTweetsByUser = useCallback(async () => {
    const tweetsRef = collection(db, "tweetsfeed");
    const q = query(tweetsRef, where("userID", "==", userObject.uid));
    const querySnapshot = await getDocs(q);
    const myTweets = [];
    querySnapshot.forEach((item) => {
      myTweets.push(item.data());
      // handleBackground(item.data());
    });
    setListOfTweets([...myTweets]);
  }, [setListOfTweets, userObject.uid]);

  const listener = useCallback(() => {
    setBackground("");
    setDisplayLoader(true);
    setIsButtonDisabled(true);
    if (isDisplayingOnlyMyTweets) {
      // unsubscribe();
      setDisplayLoader(false);
      setIsButtonDisabled(false);
      getTweetsByUser();
    } else {
      const first = query(
        collection(db, "tweetsfeed"),
        orderBy("date", "desc"),
        limit(10)
      );
      const unsubscribe = onSnapshot(first, (querySnapshot) => {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        const storedTweets = [];
        querySnapshot.forEach((item) => {
          storedTweets.push(item.data());
        });
        setListOfTweets([...storedTweets]);
        // handleBackground(listOfTweets);
        setIsLoadMoreButtonDisabled(false);
        setDisplayLoader(false);
        setIsButtonDisabled(false);
        setIsDisplayingOnlyMyTweets(false);
      });
      return unsubscribe;
    }
  }, [
    getTweetsByUser,
    // handleBackground,
    isDisplayingOnlyMyTweets,
    // listOfTweets,
    setBackground,
    setIsDisplayingOnlyMyTweets,
    setListOfTweets,
  ]);

  useEffect(() => {
    listener();
    return () => {
      //unsubscribe();
    };
    //eslint-disable-next-line
  }, [TweetList]);

  // useEffect(() => {
  //   // listener();
  //   return () => {
  //     // unsubscribe();
  //   };
  //   //eslint-disable-next-line
  // }, []);

  const fetchNext = useCallback(async () => {
    const next = query(
      collection(db, "tweetsfeed"),
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(10)
    );
    const data = await getDocs(next);
    setLastVisible(data.docs[data.docs.length - 1]);
    const moreTweets = [];
    data.docs.forEach((item) => {
      moreTweets.push(item.data());
      setListOfTweets([...listOfTweets, ...moreTweets]);
      // handleBackground(item.data());
    });
  }, [ lastVisible, listOfTweets, setListOfTweets]);

  const loadMore = useCallback(async () => {
    // setDisplayLoader(true);
    if (!isDisplayingOnlyMyTweets && !isDisplayingOnlySearchedTweets) {
      try {
        await fetchNext();
      } catch (error) {
        setDisplayLoader(false);
      }
    } else {
      setDisplayLoader(false);
    }
  }, [isDisplayingOnlyMyTweets, isDisplayingOnlySearchedTweets, fetchNext]);

  const handleScroll = useCallback(
    async (element) => {
      const scrollTop = element.current.scrollTop;
      const scrollHeight = element.current.scrollHeight;
      const offsetHeight = element.current.offsetHeight;
      const triggerheight = scrollTop + offsetHeight + 5;
      // setTriggerHeight(scrollTop + offsetHeight + 5);
      if (triggerheight >= scrollHeight) {
        setDisplayLoader(true);
        await loadMore();
      }
    },
    [
      loadMore,
      // triggerHeight
    ]
  );

  const showMyTweets = useCallback(() => {
    setIsDisplayingOnlyMyTweets(true);
    // listener();
  }, [setIsDisplayingOnlyMyTweets]);

  const showAllTweets = useCallback(() => {
    setIsDisplayingOnlyMyTweets(false);
    setIsDisplayingOnlySearchedTweets(false);
    // listener();
  }, [setIsDisplayingOnlyMyTweets, setIsDisplayingOnlySearchedTweets]);

  const showAllTweetsAfterSearch = useCallback(() => {
    setIsDisplayingOnlySearchedTweets(false);
    listener();
  }, [listener, setIsDisplayingOnlySearchedTweets]);

  return {
    listOfTweets,
    displayLoader,
    isButtonDisabled,
    loadMore,
    isLoadMoreButtonDisabled,
    handleScroll,
    showMyTweets,
    isDisplayingOnlyMyTweets,
    showAllTweets,
    isDisplayingOnlySearchedTweets,
    showAllTweetsAfterSearch,
    // handleBackground,
  };
};

export default useTweetWrapper;
