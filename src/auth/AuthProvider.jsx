import {
  FacebookAuthProvider,
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

// create a auth context
export const AuthContext = createContext();

function AuthProvider({ children }) {
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
        setUserLoading(false);
      } else {
        setUser(null);
        setUserLoading(false);
      }
    });
    return () => unsubscribe;
  }, [user?.email]);

  // all function provide to auth context value
  const authInfo = {
    user,
    userLoading,
    createNewUser,
    loginWithEmailAndPassword,
    loginWithGoogle,
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
