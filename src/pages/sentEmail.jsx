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
if (time > 12 && time < 18) {
    greeting = "Good Afternoon";
}
if (time > 18 || time < 5) {
    greeting = "Good Evening";
}
class UserHome extends Component {
constructor(props) {
    super(props);


}

  render(){
    return (
        <div className = 'homed'>
            <h1 className = 'home'>The verification email has been sent to your account</h1>
            <h1 >Please check your spam section in case you did not get the email</h1>
        </div>
    )
  }
}
export default UserHome;