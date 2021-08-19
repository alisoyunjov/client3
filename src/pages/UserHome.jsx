import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthService from "../services/authService";
import './home.css';
var d = new Date();
var greeting = "";
var time = d.getHours();


if (time < 12 && time > 5) {
    greeting = "Good Morning";
}
if (time >= 12 && time < 18) {
    greeting = "Good Afternoon";
}
if (time >= 18 || time < 5) {
    greeting = "Good Evening";
}
class UserHome extends Component {
constructor(props) {
    super(props);

    this.state = {
        currentUser: AuthService.getCurrentUser(),
    };
    }



  render(){
    const { currentUser } = this.state;
    return (
        <div className = 'homed'>
            <h1 className = 'home'>{greeting}, {currentUser.name}</h1>
        </div>
    )
  }
}
export default UserHome;