import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import useAxiosPublic from "./../hooks/useAxiosPublic";

// create a auth context
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();

  // firebase authentication all functions

  // set user
  const [user, setUser] = useState(null);

  // handle user redirect
  const [userLoading, setUserLoading] = useState(true);

  // create new user
  const createNewUser = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with email and password
  const loginWithEmailAndPassword = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const loginWithGoogle = () => {
    setUserLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // login with facebook
  const loginWithFacebook = () => {
    setUserLoading(true);
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // login with github
  const loginWithGithub = () => {
    setUserLoading(true);
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };
  //   logout user
  const userSignOut = () => {
    setUserLoading(true);
    return auth.signOut();
  };
  // update user profile
  const updateUserProfile = (userName, profilePhoto) => {
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: profilePhoto,
    });
  };

  // user state set in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // get token and store local storage
        const userEmail = { email: currentUser.email };

        axiosPublic.post("/user-login", userEmail).then((res) => {
          const resToken = res.data.userToken;
          if (resToken) {
            localStorage.setItem("userToken", resToken);
          }
        });
      } else {
        setUser(null);
        localStorage.removeItem("userToken");
      }
      setUserLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.email, axiosPublic]);

  // all function provide to auth context value
  const authInfo = {
    user,
    userLoading,
    createNewUser,
    loginWithEmailAndPassword,
    loginWithGoogle,
    loginWithGithub,
    loginWithFacebook,
    updateUserProfile,
    userSignOut,
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
