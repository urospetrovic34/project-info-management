import React from "react";
import { Login } from "./components/auth/login/Login";
import Header from "./components/elements/navigation/header/Header";
import SubHeader from "./components/elements/navigation/subHeader/SubHeader";
import { useAuth } from "./contexts/AuthProvider";

function App() {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated } = authState;
  return (
    <div className="wrapper">
      {isAuthenticated && <Header />}
      {isAuthenticated && <SubHeader />}
      <Login />
    </div>
  );
}

export default App;
