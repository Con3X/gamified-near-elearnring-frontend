import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../utils/authFetch";

export default function GuardUrl({ children }) {
  if (!isTokenValid()) {
    return <Navigate to="/" />;
  }
  return children;
}
