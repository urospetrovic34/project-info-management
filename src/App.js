import React from "react";
import { Login } from "./components/auth/login/Login";
import CardProjectInfo from "./components/elements/cards/CardProjectInfo";
import Header from "./components/elements/navigation/header/Header";
import SubHeader from "./components/elements/navigation/subHeader/SubHeader";
import { useAuth } from "./contexts/AuthProvider";

function App() {
  const [authState, authDispatch] = useAuth();
  const { token } = authState;
  console.log(authDispatch);
  return (
    <div className="wrapper">
      {token && <Header />}
      {token && <SubHeader />}
      <Login />
      <CardProjectInfo />
    </div>
  );
}

export default App;
