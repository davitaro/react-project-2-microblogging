import "../Create New Account/CreateNewAccount.css";
import Button from "Components/Button/Button";
import Line from "Components/Line/Line";
import { useState } from "react";
import Error from "Components/Error/Error";
import Notification from "Components/Notification/Notification";
import { auth } from "firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ setIsSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [isDisplayingEmailError, setIsDisplayingEmailError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [isDisplayingPasswordError, setIsDisplayingPasswordError] =
    useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [isDisplayingNotification, setIsDisplayingNotification] =
    useState(false);
  const [generalErrorText, setGeneralErrorText] = useState("");

  //email and password change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    handleSetNotification();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    handleSetNotification();
  };

  //validation

  const validateEmail = (inputtext) => {
    if (inputtext.length < 1) {
      setEmailErrorText("Please enter an email");
      setIsDisplayingEmailError(true);
      return false;
    } else {
      setIsDisplayingEmailError(false);

      return true;
    }
  };

  const validatePassword = (inputtext) => {
    if (inputtext.length < 1) {
      setPasswordErrorText("Please enter a password");
      setIsDisplayingPasswordError(true);
      return false;
    } else {
      setIsDisplayingPasswordError(false);
      return true;
    }
  };

  const handleValidation = () => {
    validateEmail(email);
    validatePassword(password);
    if (validateEmail(email) && validatePassword(password)) {
      return true;
    } else {
      return false;
    }
  };

  //notifications
  const handleSetNotification = (value) => {
    if (value) {
      setIsDisplayingNotification(true);
      setNotificationText(
        `You are now logged in with the email: ${email} and password: ${password}.`
      );
    } else {
      setNotificationText("");
      setIsDisplayingNotification(false);
    }
  };

  //auth
  const handleAuthSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        //Signed in
        handleSetNotification(true);
        setGeneralErrorText("");
        // setIsSignedIn(true);
      })
      .catch((error) => {
        handleSetNotification();
        const errorCode = error.code;
        setGeneralErrorText(errorCode);
      });
  };
  //sign in
  const handleSignIn = () => {
    handleValidation();
    if (handleValidation()) {
      handleAuthSignIn();
    }
  };

  return (
    <div className="create-new-account-wrapper">
      <h1>Sign In</h1>
      <p>Please enter your login credentials below.</p>
      <div className="form">
        {isDisplayingEmailError && <Error serverError>{emailErrorText}</Error>}
        <input placeholder="email" onChange={handleEmailChange} />
        {isDisplayingPasswordError && (
          <Error serverError>{passwordErrorText}</Error>
        )}
        <input placeholder="password" onChange={handlePasswordChange} />
        <Line gap>
          {isDisplayingNotification ? (
            <Notification>{notificationText}</Notification>
          ) : null}

          {generalErrorText && <Error serverError>{generalErrorText}</Error>}

          <Button buttonName="Sign In" handleClick={handleSignIn} />
        </Line>
      </div>
    </div>
  );
};

export default SignIn;
