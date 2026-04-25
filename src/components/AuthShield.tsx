import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import DashboardSkeleton from '../skeletons/DashboardSkeleton';
import AccountSkeleton from '../skeletons/AccountSkeleton';

// useMatch is the new pattern, but it doesn't work with class components. Womp womp.
const skeletonMapping: { [key: string]: React.ReactNode } = {
  '/account': <AccountSkeleton />,
  '/dashboard': <DashboardSkeleton />,
};

class AuthShield extends React.Component {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  render() {
    if (this.context.isLoading) {
      const skeleton = skeletonMapping[window.location.pathname];
      return skeleton || null;
    }

    return (this.context.isAuthenticated ? <Outlet /> : <Navigate to="/login" />)
  };
}

export default AuthShield;