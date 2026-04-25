import React from 'react';
import { Skeleton } from '@mui/material';

class AccountSkeleton extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Fill in proper skeleton once Account page is implemented */}
        <Skeleton variant="text" />
      </div>
    );
  }
}

export default AccountSkeleton;
