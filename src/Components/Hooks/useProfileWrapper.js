import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import { UserContext } from "Context/UserContext";
import { FirebaseController } from "firebase.config";

const useProfileWrapper = () => {
  const { userObject } = useContext(UserContext);
  const [errorText, setErrorText] = useState("");
  const [imageAsFile, setImageAsFile] = useState("");
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSource, setImageSource] = useState(userObject.photoURL);

  const storage = getStorage();

  const metadata = {
    contentType: "image/jpeg",
  };

  const uploadImage = async (uID) => {
    setErrorText("");
    if (imageAsFile === "") {
      setErrorText(`not an image, the image file is a ${typeof imageAsFile}`);
      setIsImageUpdated(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const profileImageRef = ref(storage, `users/${uID}/profile.jpeg`);
      uploadBytes(profileImageRef, imageAsFile, metadata)
        .then((snapshot) => {
          setIsImageUpdated(true);
          setIsLoading(false);
          FirebaseController.getProfileImage(uID);
          setImageSource(userObject.photoURL);
        })
        .catch((error) => {});
      setIsImageUpdated(false);
      setIsLoading(false);
    }
  };

  const handleImageAsFile = (e) => {
    setIsImageUpdated(false);
    const image = e.target.files[0];
    setImageAsFile(image);
  };
  return {
    handleImageAsFile,
    uploadImage,
    errorText,
    isImageUpdated,
    isLoading,
    setIsLoading,
    imageSource,
  };
};

export default useProfileWrapper;
