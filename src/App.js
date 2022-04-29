import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/admin/dashboard/Dashboard";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import CreateNoteTab from "./components/elements/createNoteTab/CreateNoteTab";
import Header from "./components/elements/navigation/header/Header";
import { Home } from "./components/home/Home";
import { Project } from "./components/project/Project";
import { useAuth } from "./contexts/AuthProvider";
import { DefaultRoute } from "./routes/defaultRoute";
import { PrivateRoute } from "./routes/privateRoute";
import { PublicRoute } from "./routes/publicRoute";
import { FilePreview } from "./components/elements/filePreview/FilePreview";
import CreateProjectPage from "./components/createProject/CreateProjectPage";
import EditAccountPage from "./components/elements/editAccountPage/EditAccountPage";
import { Account } from "./components/account/Account";

function App() {
    const [authState, authDispatch] = useAuth();
    const { user, token } = authState;

    useEffect(() => {
        document.title = "Project Info Management";
    }, []);

    return (
        <Router>
            <div className="wrapper">
                {user && token && <Header />}
                {/* <EditAccountPage /> */}
                {/* {user && token && <Tabs />} */}
                {/* <CreateNoteTab /> */}
                {/* {token && <SubHeader />} */}
                {/* <SubHeaderEmployee /> */}
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <PrivateRoute redirect="/login">
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact
                        path="/projects/create"
                        element={
                            <PrivateRoute redirect="/login">
                                <CreateProjectPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact
                        path="/projects/:id"
                        element={
                            <PrivateRoute redirect="/login">
                                <Project />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact
                        path="/notes/create/:id"
                        element={
                            <PrivateRoute redirect="/login">
                                <CreateNoteTab />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact
                        path="/account"
                        element={
                            <PrivateRoute redirect="/login">
                                <Account />
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
                    <Route
                        exact
                        path="*"
                        element={<DefaultRoute></DefaultRoute>}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
