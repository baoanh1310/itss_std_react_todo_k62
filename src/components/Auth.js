import React, {useEffect, useState} from "react";
import firebase,{uiConfig} from "../lib/firebase";
import {StyledFirebaseAuth} from "react-firebaseui";
import useStorageUser from "../hooks/storage_user";


function Auth() {
    const [users, addUser] = useStorageUser();
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            if(user){
                let flag = false;
                for(let target of users){
                    if(target.key === user.email){
                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    addUser({key: user.email, name: user.displayName})
                }
            }
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);
    const signout = () => {
        firebase.auth().signOut();
    };
    if (!isSignedIn) {
        return (
            <div className="column panel-block">
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
    return (
        <div className="column panel-block">
            <p>{firebase.auth().currentUser.displayName}</p>
            <button className="button is-danger is-light is-small" onClick={signout}>Sign out</button>
        </div>
    );
}
export default Auth;
