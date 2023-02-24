import React from "react";
import { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/clientApp";

// config firebaseui
const uiConfig = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  signInOptions: [
    // we will display google, email and github sign in options
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  
};

export default function SignInScreen() {
    const [widget, setWidget] = useState(null);

    useEffect(() => {
        setWidget(
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />)
    }, [])

    return (
        <div>
            <h1>Pineapple Login</h1>
            <p>Please Sign-in</p>
            {widget}
        </div>
    )
}