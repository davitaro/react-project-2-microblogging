import "./NavBar.css";
import Line from "Components/Line/Line";
import { NavLink } from "react-router-dom";
import Button from "Components/Button/Button";
import { useContext } from "react";
import { UserContext } from "Context/UserContext";
import ProfileImage from "Components/Profile Image/ProfileImage";
import SearchBar from "./SearchBar";

const NavBar = ({ handleSignOut }) => {
  const { userObject } = useContext(UserContext);
  const d = new Date();
  const today = d.toDateString();

  return (
    <div className="navbar">
      <Line gap>
        <Line>
          {userObject ? (
            <Line gap>
              {" "}
              <div className="grad welcome">
                {" "}
                Welcome, {userObject.displayName || userObject.email}!
              </div>
              <Button buttonName="Sign Out" handleClick={handleSignOut} />
              <p className="small-date"> {today}</p>
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/inspo">Inspo</NavLink>
              <ProfileImage imageSource={userObject.photoURL} />
              <SearchBar />
            </Line>
          ) : (
            <NavLink to="/account">Sign In / Sign Up</NavLink>
          )}
        </Line>
        <div></div>
      </Line>
    </div>
  );
};

export default NavBar;
