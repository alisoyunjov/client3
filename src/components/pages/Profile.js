import React, { Component } from "react";
import AuthService from "../../services/authService";
import "./Profile.css";
class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
        currentUser: AuthService.getCurrentUser()

    }
}

  render() {
    const { currentUser } = this.state;
    var url ='https://vepimg.b8cdn.com/uploads/vjfnew/699/uploads/vjf/content/misc/15870421763.png';
    var role = currentUser.role

    if (role == 'scientist'){
      role = "Scientist";
    }
    else {
      role = "Admin";
    }
    return (
      <div className= "profile">
      <h1 className="heading">My Profile</h1>
      <div className="card">
        <div className="top">
          <h1 className="name">Name: {currentUser.name}</h1>
          <img
            className="circle-img"
            src="https://vepimg.b8cdn.com/uploads/vjfnew/699/uploads/vjf/content/misc/15870421763.png"
            alt="avatar_img"
          />
        </div>
        <div className="bottom">
          <h3>Role: {role}</h3>
        </div>
      </div>
    </div>
    );
  }
}

export default Profile;
