import "./Tweet.css";
import Line from "../../../Components/Line/Line";
import ProfileImage from "Components/Profile Image/ProfileImage";
import { useEffect } from "react";

const Tweet = ({ displayName, text, date, profile, getTweetCount }) => {

 useEffect(() => {
    getTweetCount();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="tweet in">
      <div className="tweet-info">
        <Line between>
          <Line gap>
            <ProfileImage imageSource={profile} />
            {displayName}
          </Line>
          <div> {date.toString()}</div>
        </Line>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default Tweet;
