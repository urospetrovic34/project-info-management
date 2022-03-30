import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/admin/dashboard/Dashboard";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import Header from "./components/elements/navigation/header/Header";
import SubHeader from "./components/elements/navigation/subHeader/SubHeader";
import Tabs from "./components/elements/tabs/Tabs";
import { Test } from "./components/test/Test";
import { useAuth } from "./contexts/AuthProvider";
import { DefaultRoute } from "./routes/defaultRoute";
import { PrivateRoute } from "./routes/privateRoute";
import { PublicRoute } from "./routes/publicRoute";

function App() {
  const [authState, authDispatch] = useAuth();
  const { user, token } = authState;

  window.addEventListener("beforeunload", () => {
    if (localStorage.getItem("remember") === "false") {
      localStorage.clear();
    }
  });

  return (
    <Router>
      <div className="wrapper">
        {user && token && <Header />}
        {/* {user && token && <Tabs />} */}

        {/* {token && <SubHeader />} */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute redirect="/login">
                <Test />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin"
            element={
              <PrivateRoute redirect="/login">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute redirect="/">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <PublicRoute redirect="/">
                <Register />
              </PublicRoute>
            }
          />
          <Route exact path="*" element={<DefaultRoute></DefaultRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
