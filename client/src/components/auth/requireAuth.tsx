import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../store";

const requireAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
};

export default requireAuth;
