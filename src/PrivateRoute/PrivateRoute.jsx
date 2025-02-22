import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext)

  const location = useLocation()

  // if (loading) return <p>LoadingSpinner.....</p>

  if (user) return children
  return <Navigate to='/' state={location.pathname} />
};

export default PrivateRoute;