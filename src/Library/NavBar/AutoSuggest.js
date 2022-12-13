// import Autosuggest from "react-autosuggest";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { signOut, getAuth } from "firebase/auth";


export const listAllUsers = (nextPageToken) => {
//   //list batch of users, 10 at a time

//   getAuth()
//     .listUsers(10, nextPageToken)
//     .then((listUsersResult) => {
//       listUsersResult.users.forEach((userRecord) => {
//         console.log("user", userRecord.toJSON());
//       });
//       if (listUsersResult.pageToken) {
//         //list next batch of users
//         listAllUsers(listUsersResult.pageToken);
//       }
//     })
//     .catch((error) => {
//       console.log("error listing users:", error);
//     });
};
