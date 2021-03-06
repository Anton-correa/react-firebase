import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import {Router, navigate} from '@reach/router';
import Login from './Login';
import Register from './Register';
import Meetings from './Meetings';
import firebase from './Firebase';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
          const meetingsRef = firebase.database().ref('meetings/' + FBUser.uid);

          meetingsRef.on('value', snapshot => {
            let meetings = snapshot.val();
            let meetingsList = [];

            for(let item in meetings){
              meetingsList.push({
                meetingID: item,
                meetingName: meetings[item].meetingName
              });
            }
            this.setState({
              meetings: meetingsList,
              howManyMeetings: meetingsList.length
            })
          })
      }else{
        this.setState({user: null});
      }
    })
  }
  
reisterUser = userName => {
  firebase.auth().onAuthStateChanged(FBUser => {
    FBUser.updateProfile({
      displayName: userName
    }).then(()=>{
      this.setState({
        user: FBUser,
        displayName: this.displayName,
        userID: FBUser.uid
      });
      navigate('/meetings');
    });
  });
};

logOutUser = e =>{
  e.preventDefault();
  this.setState({
    displayName: null,
    userID: null,
    user:null
  });

  

  firebase.auth().signOut().then(()=>{
    navigate('/login');

  });
}
addMeeting = meetingName => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    ref.push({meetingName: meetingName});
  }
  render() {
    return (
      <div className="App">
      <Navigation user={this.state.user} logOutUser={this.logOutUser} />
      {this.state.user && <Welcome userName = {this.state.displayName} logOutUser={this.logOutUser}/>}
      <Router>
        <Home path="/" user={this.state.user}/>
        <Login path="/login" />
        <Meetings path="/meetings" meetings={this.state.meetings} addMeeting={this.addMeeting} userID ={this.state.user.uid}/>
        <Register path="/register" registerUser={this.registerUser} />

      </Router>
        
      </div>
    );
  }
}

export default App;
