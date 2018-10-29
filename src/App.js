import React, { Component } from 'react';
import Dashboard from './Components/dashboard/dashboard';
import LogIn from './Components/auth/LogIn';
import * as firebase from 'firebase';
import "./config/config";


class App extends Component {
  constructor() {
    super()
    this.state = {
      User: {},
      
      
    }
  }
  componentDidMount = () => {
    this.authListener();
  }
  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({User: user})
        console.log("user logged In")
      } else {
        this.setState({User: null})
      }
    });
  }
  render() {
    return (
      <div className="App">
      {this.state.User? (<Dashboard/>) : (<LogIn />)}
      </div>
    );
  }
}

export default App;
