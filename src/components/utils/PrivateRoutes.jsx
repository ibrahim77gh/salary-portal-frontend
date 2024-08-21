import { useAppSelector } from "../../redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line no-unused-vars, react/prop-types
const PrivateRoutes = ({children, ...rest}) => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    !isLoading && !isAuthenticated ? <Navigate to='/login'/> : <Outlet/> 
  )
}

export default PrivateRoutes