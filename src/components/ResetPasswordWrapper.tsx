import React from "react";
import { useParams } from "react-router-dom";
import ResetPassword from "../pages/ResetPassword";

// Class components can't use the useParams hook. Womp womp.

const ResetPasswordWrapper = (props: React.ComponentProps<typeof ResetPassword>) => {
  const params = useParams();

  return (
    <ResetPassword
      {...props}
      params={params}
    />
  );
};

export default ResetPasswordWrapper;