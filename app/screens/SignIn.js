import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import styles from '../styles/common-styles.js';
import * as firebase from 'firebase';

export default class SignIn extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      loaded: true,
      user: null
    }
  }
  render(){
    return (
  <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel>Group</FormLabel>
      <FormInput
        style={[styles.textinput, {marginTop: 100}]}
        onChangeText={(text) => this.setState({username: text})}
        value={this.state.username}
        placeholder={"Group Name..."}
      />
      <FormLabel>Password</FormLabel>
      <FormInput
        style={styles.textinput}
        onChangeText={(text) => this.setState({password: text})}
        value={this.state.password}
        secureTextEntry={true}
        placeholder={"Password..."}
      />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onpress={() => {
          this.signIn()
          .then((data) => {
            this.props.navigation.navigate('SignedIn');
          })
          .catch(err => console.error("error: " + err));
        }}
      />
    </Card>
  </View>
);
}

signIn() {

  this.setState({
    loaded: false
  });
  this.setState({username: this.state.username + "@yourowndomain.com"});
  console.log(this.state.username);
  firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
          .then((user) => { this.setState({ user, error: '', loaded: true }); });
}
}
