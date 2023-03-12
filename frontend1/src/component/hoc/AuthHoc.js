import React from "react";
import Login from "../login/Login";

export function checkLogin() {
    return class extends React.Component {
      
      render() {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token') ? this.props.component : <Login />
      }
    }
  }