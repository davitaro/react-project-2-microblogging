import "./SearchBar.css";
import { useState, useContext, useRef } from "react";
import Line from "Components/Line/Line";
import Button from "Components/Button/Button";
import Error from "Components/Error/Error";
import { SearchContext } from "Context/SearchContext";
import { listAllUsers } from "./AutoSuggest";

const SearchBar = () => {
  const searchQueryRef = useRef();

  const {
    radioValue,
    setRadioValue,
    searchText,
    setSearchText,
    searchContent,
    searchUser,
  } = useContext(SearchContext);

  const [errorText, setErrorText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    searchQueryRef.current.value = "";

    if (radioValue === "user") {
      searchUser(searchText);
      setSearchText("");
    } else if (radioValue === "content") {
      searchContent(searchText);
      setSearchText("");
    } else {
      setErrorText("Please choose a search option");
    }
  };

  const handleRadioChange = (e) => {
    const checkedValue = e.target.value;
    setRadioValue(checkedValue);
    setErrorText("");
    listAllUsers();
  };

  return (
    <div className="search-bar">
      <Line gap>
        <div className="search-box">
          <input
            ref={searchQueryRef}
            placeholder="Search"
            className="search-input"
            onChange={handleInputChange}
          ></input>
          <Button buttonName="Search" handleClick={handleSearch}></Button>
        </div>

        <div onChange={handleRadioChange}>
          <Line gap>
            <input
              className="radio-input"
              type="radio"
              value="user"
              name="search"
            />{" "}
            user
            <input
              className="radio-input"
              type="radio"
              value="content"
              name="search"
            />{" "}
            content
          </Line>
        </div>
        {errorText && <Error>{errorText}</Error>}
      </Line>
    </div>
  );
};

export default SearchBar;
