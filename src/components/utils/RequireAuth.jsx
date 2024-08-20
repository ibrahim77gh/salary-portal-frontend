import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Spinner from "../Spinner";


// eslint-disable-next-line react/prop-types
export default function RequireAuth({ children }) {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    navigate("/login");
  }

  return <>{children}</>;
}
