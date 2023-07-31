import { Navigate, useLocation } from "react-router";
import { useAuth } from "./auth";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  console.log("useLocation: ", location);
  console.log("Token: ", auth.jwt);

  if (!auth.jwt) {
    alert("Please log in");
    return (
      <Navigate to="/signin" state={{ path: location.pathname }} />
    );
  }

  return children;
};
