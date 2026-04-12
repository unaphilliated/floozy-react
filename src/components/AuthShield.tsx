import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

class AuthShield extends React.Component {
  render() {
    // TODO: Actually verify token is valid, not just that it exists
    return (localStorage.getItem('token') ? <Outlet /> : <Navigate to="/login" />)
  };
}

export default AuthShield;