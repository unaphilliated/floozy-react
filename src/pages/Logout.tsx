import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

class Logout extends React.Component {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  render() {
    this.context.logout();
    return <Navigate to="/login" />;
  }
}

export default Logout;
