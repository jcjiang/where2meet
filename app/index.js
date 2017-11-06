
import React from "react";
import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";
import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyB0w6HmrgkakHS069xfMTjHP-88x7udpAQ",
      authDomain: "where2meet-e6c9a.firebaseapp.com",
      databaseURL: "https://where2meet-e6c9a.firebaseio.com",
      projectId: "where2meet-e6c9a",
      storageBucket: "where2meet-e6c9a.appspot.com",
      messagingSenderId: "411286369839"
    };
    firebase.initializeApp(config);
  }


  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}
