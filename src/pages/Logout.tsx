import React from 'react';
import { Navigate } from 'react-router-dom';

class Logout extends React.Component {
  render() {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
}

export default Logout;
