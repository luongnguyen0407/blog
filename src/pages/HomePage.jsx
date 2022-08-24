import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-app/firebase-config";

const HomePage = () => {
  const Signout = () => {
    signOut(auth);
  };
  return (
    <div>
      <button onClick={Signout}>lout</button>
    </div>
  );
};

export default HomePage;
