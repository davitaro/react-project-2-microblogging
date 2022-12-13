import Button from "Components/Button/Button";
import "./CreateNewAccount.css";
import { useState } from "react";
import Error from "Components/Error/Error";
import Notification from "Components/Notification/Notification";
import Line from "Components/Line/Line";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase.config";

const CreateNewAccount = () => {
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

  // const validateEmail = (inputtext) => {
  //   const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if (inputtext.match(mailformat)) {
  //     setEmailErrorText("");
  //     setIsDisplayingEmailError(false);
  //     return true;
  //   } else {
  //     setIsDisplayingEmailError(true);
  //     setEmailErrorText("Please enter a valid email");
  //     return false;
  //   }
  // };

  const validatePassword = (inputtext) => {
    const minlength = 6;
    if (inputtext.length < minlength) {
      setPasswordErrorText(
        "Please enter a password with at least 6 characters"
      );
      setIsDisplayingPasswordError(true);
      return false;
    } else {
      setPasswordErrorText("");
      setIsDisplayingPasswordError(false);
      return true;
    }
  };

  const handleValidation = () => {
    // validateEmail(email);
    validatePassword(password);
    if (
      // validateEmail(email) &&
      validatePassword(password)
    ) {
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
        `An account has been created with the email: ${email} and password: ${password}.`
      );
    } else {
      setNotificationText("");
      setIsDisplayingNotification(false);
    }
  };

  //create account
  const handleCreateAccount = () => {
    handleValidation();
    if (handleValidation()) {
      handleAuthSignUp(email, password);
    } else {
      handleSetNotification();
    }
  };

  //auth

  const handleAuthSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        handleSetNotification(true);
      })
      .catch((error) => {
        handleSetNotification();
        const errorCode = error.code;
        setEmailErrorText(errorCode);
        setIsDisplayingEmailError(true);
      });
  };

  return (
    <div className="create-new-account-wrapper">
      <h1>Create New Account</h1>
      <p>
        Please enter your details below to create an account using your email
        and a new password.
      </p>
      <div className="form">
        {isDisplayingEmailError && <Error serverError>{emailErrorText}</Error>}
        <input placeholder="email" onChange={handleEmailChange} />
        {isDisplayingPasswordError && (
          <Error serverError>{passwordErrorText}</Error>
        )}
        <input
          placeholder="create a new password"
          onChange={handlePasswordChange}
        />
        <Line>
          {isDisplayingNotification ? (
            <Notification>{notificationText}</Notification>
          ) : null}
          <Button
            buttonName="Create Account"
            handleClick={handleCreateAccount}
          />
        </Line>
      </div>
    </div>
  );
};

export default CreateNewAccount;
