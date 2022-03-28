import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import Header from "./components/elements/navigation/header/Header";
import SubHeader from "./components/elements/navigation/subHeader/SubHeader";
import { Test } from "./components/test/Test";
import { useAuth } from "./contexts/AuthProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
    const [authState, authDispatch] = useAuth();
    console.log(authDispatch)
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
                {user && token && <SubHeader />}
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <ProtectedRoute redirect="/login">
                                <Test />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/login"
                        element={
                            <Login />
                        }
                    />
                    <Route
                        exact
                        path="/register"
                        element={
                            <Register />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
