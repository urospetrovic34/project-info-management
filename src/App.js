import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import Header from "./components/elements/navigation/header/Header";
import SubHeader from "./components/elements/navigation/subHeader/SubHeader";
import { Test } from "./components/test/Test";
import { useAuth } from "./contexts/AuthProvider";
import { PrivateRoute } from "./routes/privateRoute";
import { PublicRoute } from "./routes/publicRoute";

function App() {
    const [authState, authDispatch] = useAuth();
    console.log(authDispatch);
    const { user, token } = authState;

    window.addEventListener("beforeunload", () => {
        if (localStorage.getItem("remember") === "false") {
            localStorage.clear();
        }
    });

    return (
        <Router>
            <div className="wrapper">
                {token && <Header />}
                {token && <SubHeader />}
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
                    <Route
                        exact
                        path="*"
                        element={
                            <PublicRoute redirect="/">
                                <Login />
                            </PublicRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
