import "./Joke.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "Components/Button/Button";
import Error from "Components/Error/Error";

const Joke = () => {
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [count, setCount] = useState(0);
  const [jokeErrorText, setJokeErrorText] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [quoteErrorText, setQuoteErrorText] = useState("");
  const [quoteCount, setQuoteCount] = useState(0);

  const getJoke = () => {
    const options = {
      method: "GET",
      url: "https://dad-jokes.p.rapidapi.com/random/joke",
      headers: {
        "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
        "x-rapidapi-key": "bf4f11919dmsh5505938d6f65c47p1fbd0fjsn2d2865e0f8e2",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSetup(response.data.body[0].setup);
        setPunchline(response.data.body[0].punchline);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 429) {
            setJokeErrorText("That's enough for today! Try again tomorrow.");
          }
        }
      });
  };

  const reveal = () => {
    setIsRevealed(!isRevealed);
  };

  const handleShowNewJoke = () => {
    setCount(count + 1);
  };

  const getQuote = () => {
    const quoteoptions = {
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      headers: {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "bf4f11919dmsh5505938d6f65c47p1fbd0fjsn2d2865e0f8e2",
      },
    };

    axios
      .request(quoteoptions)
      .then(function (response) {
        setQuote(response.data.content);
        setAuthor(response.data.originator.name);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 429) {
            setQuoteErrorText("That's enough for today! Try again tomorrow.");
          }
        }
      });
  };

  const handleShowNewQuote = () => {
    setQuoteCount(quoteCount + 1);
  };

  useEffect(() => {
    getJoke();
    return () => {
      // unsubscribe();
    };
    //eslint-disable-next-line
  }, [count]);

  useEffect(() => {
    getQuote();
    return () => {};
  }, [quoteCount]);

  return (
    <div>
      <div className="joke-container">
        <div className="joke-header">
          <h1>Quote</h1>
        </div>
        <div className="joke-body">
          {quoteErrorText ? (
            <Error>{quoteErrorText}</Error>
          ) : (
            <div>
              <h3>{quote}</h3>
              <h4>{author}</h4>
              <Button
                buttonName="New Quote"
                handleClick={handleShowNewQuote}
              ></Button>
            </div>
          )}
        </div>
      </div>

      <div className="joke-container">
        <div className="joke-header">
          <h1>Today's XKCD</h1>
        </div>
        <img
          src="https://imgs.xkcd.com/comics/now.png"
          width="400"
          height="400"
          alt="xkcd"
        ></img>
      </div>
      <div className="joke-container">
        <div className="joke-header">
          <h1>Joke</h1>
        </div>
        <div className="joke-body">
          {jokeErrorText ? (
            <Error>{jokeErrorText}</Error>
          ) : (
            <div>
              <h3>{setup}</h3>
              <Button
                buttonName={isRevealed ? "hide" : "reveal"}
                handleClick={reveal}
              ></Button>
              <h4>{isRevealed ? punchline : ""}</h4>
              <Button
                buttonName="New Joke"
                handleClick={handleShowNewJoke}
              ></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Joke;
