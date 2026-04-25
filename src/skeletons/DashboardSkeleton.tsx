import React from 'react';
import { Skeleton } from '@mui/material';
import '../styles/Dashboard.scss';

class DashboardSkeleton extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Fill in proper skeleton once Dashboard page is implemented */}
        <Skeleton variant="text" />
      </div>
    );
  };
}

export default DashboardSkeleton;