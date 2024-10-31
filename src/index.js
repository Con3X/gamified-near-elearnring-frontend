import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "utils/ContextProvider";
import App from "app/App";
import { createAuthProvider } from "react-token-auth";
import "./index.css";

const { useAuth, authFetch, login, logout } = createAuthProvider({
  getAccessToken: (token) => token,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);
