import { AsyncStorage } from "react-native";
import * as firebase from 'firebase';

export const USER_KEY = "auth-demo-key";

export const onSignIn = (username, password) => {
    //AsyncStorage.setItem(USER_KEY, "true");
    var email = username + "@yourowndomain.com";
    firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => { this.setState({ user, error: '', loaded: true }); });
};

export const onSignOut = () => {
  AsyncStorage.removeItem(USER_KEY);
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
