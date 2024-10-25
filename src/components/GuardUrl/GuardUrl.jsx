import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../utils/ProviderAuth";
import ScrollToTop from "components/scrolleToTop/ScrollToTop.jsx";

export default function GuardUrl({ children }) {
  if (!isTokenValid()) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
