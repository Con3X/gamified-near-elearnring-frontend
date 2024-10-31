import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../utils/ProviderAuth";
import ScrollToTop from "components/scrolleToTop/ScrollToTop.jsx";
import { useEffect, useState } from "react";

export default function GuardUrl({ children }) {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const valid = await isTokenValid();
      setIsValid(valid);
    };

    checkToken();
  }, []);

  if (!isValid) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
