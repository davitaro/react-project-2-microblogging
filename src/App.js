import "./App.css";
import TweetWrapper from "Library/Home Page/TweetWrapper/TweetWrapper";
import ProfileWrapper from "Library/Profile Page/ProfileWrapper/ProfileWrapper";
import NavBar from "Library/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "Context/UserContext";
import { SearchContext } from "Context/SearchContext";
import { TweetsListContext } from "Context/TweetsListContext";
import Account from "Library/Account/Account";
import React from "react";
import { FirebaseController } from "firebase.config";
import useApp from "Components/Hooks/useApp";
import Joke from "Library/JOTD/Joke";

function App() {
  const {
    userObject,
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
  } = useApp();

  return (
    <UserContext.Provider
      value={{
        userObject: userObject,
      }}
    >
      <TweetsListContext.Provider
        value={{
          listOfTweets: listOfTweets,
          setListOfTweets: setListOfTweets,
          isDisplayingOnlyMyTweets: isDisplayingOnlyMyTweets,
          setIsDisplayingOnlyMyTweets: setIsDisplayingOnlyMyTweets,
          isDisplayingOnlySearchedTweets: isDisplayingOnlySearchedTweets,
          setIsDisplayingOnlySearchedTweets: setIsDisplayingOnlySearchedTweets,
        }}
      >
        <SearchContext.Provider
          value={{
            searchText,
            setSearchText,
            radioValue,
            setRadioValue,
            searchContent,
            searchUser,
          }}
        >
          <div className="App">
            <NavBar handleSignOut={FirebaseController.handleSignOut} />
            <div className="content-wrapper">
              <Routes>
                <Route
                  path="/"
                  element={userObject ? <TweetWrapper /> : <Account />}
                />
                <Route
                  path="/home"
                  element={userObject ? <TweetWrapper /> : <Account />}
                />
                <Route path="/account" element={<Account />} />
                <Route path="/profile" element={userObject? <ProfileWrapper />: <Account/>} />
                <Route path="/inspo" element={userObject? <Joke /> : <Account/>} />
              </Routes>
            </div>
          </div>
        </SearchContext.Provider>
      </TweetsListContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
