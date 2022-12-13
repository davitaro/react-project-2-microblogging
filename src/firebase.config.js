import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { signOut, getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2YumjERSpaP2CDkdzjWIyjKhyVhd3b5M",
  authDomain: "microblog-dr.firebaseapp.com",
  projectId: "microblog-dr",
  storageBucket: "microblog-dr.appspot.com",
  messagingSenderId: "166514506816",
  appId: "1:166514506816:web:01de38365037e71f77f3a5",
  measurementId: "G-WYHCHTSJND",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.settings({ timestampInSnapshots: true });

export const auth = getAuth();

export const FirebaseController = {
  handleSignOut: () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  },

  handleProfileUpdate: (nameToDisplay) => {
    updateProfile(auth.currentUser, {
      displayName: nameToDisplay,
    })
      .then(() => {
        //profile updated!
      })
      .catch((error) => {
        //an error has occurred
        console.log(error);
      });
  },
  handleProfileImageUpdate: (url) => {
    updateProfile(auth.currentUser, {
      photoURL: url,
    })
      .then(() => {})
      .catch((error) => {
        //an error has occurred
        console.log(error);
      });
  },

  getProfileImage: (userIdentification) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `users/${userIdentification}/profile.jpeg`))
      .then((url) => {
        FirebaseController.handleProfileImageUpdate(url);
        return url;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default db;
