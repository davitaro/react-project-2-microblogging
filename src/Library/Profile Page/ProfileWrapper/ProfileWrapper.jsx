import "./ProfileWrapper.css";
import Button from "Components/Button/Button";
import Line from "Components/Line/Line";
import useProfileWrapper from "Components/Hooks/useProfileWrapper";
import { Navigate } from "react-router-dom";
import { UserContext } from "Context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import ProfileImage from "Components/Profile Image/ProfileImage";
import Error from "Components/Error/Error";
import { FirebaseController } from "firebase.config";
import Loader from "Components/Loader/Loader";

const ProfileWrapper = () => {
  const { userObject } = useContext(UserContext);

  const {
    uploadImage,
    handleImageAsFile,
    errorText,
    isImageUpdated,
    isLoading,
    imageSource,
  } = useProfileWrapper();

  const [displayName, setDisplayName] = useState("");
  const [isDisplayNameUpdated, setIsDisplayNameUpdated] = useState(false);

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    setIsDisplayNameUpdated(false);
  };

  const handleDisplayNameSave = () => {
    FirebaseController.handleProfileUpdate(displayName);
    setIsDisplayNameUpdated(true);
  };

  return (
    <div className="profile-wrapper">
      {!userObject ? <Navigate replace to="/account" /> : ""}
      <h1>Profile</h1>
      <label>Display Name</label>
      <div className="profile-input">
        <Line>
          <input
            className="profile-input-input"
            defaultValue={userObject.displayName || userObject.email}
            onChange={handleDisplayNameChange}
          />
          <Button
            buttonName={
              !isDisplayNameUpdated ? "Update Display Name" : "Updated ✔"
            }
            handleClick={handleDisplayNameSave}
            color={isDisplayNameUpdated ? "success" : ""}
          />
        </Line>
      </div>

      <div className="profile-details">
        <h1>Profile Image</h1>
        <ProfileImage imageSource={imageSource} fullSize />

        <div className="profile-input">
          <Line>
            <input
              className="profile-input-input"
              type="file"
              onChange={(e) => {
                handleImageAsFile(e);
              }}
            />
            <Line gap>
              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  buttonName={isImageUpdated ? "Updated ✔" : "Upload Image"}
                  handleClick={async () => {
                    await uploadImage(userObject.uid);
                  }}
                  color={isImageUpdated ? "success" : ""}
                />
              )}

              <div className="upload-error">
                {errorText && <Error>{errorText}</Error>}
              </div>
            </Line>
          </Line>
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
