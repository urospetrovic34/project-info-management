import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/admin/dashboard/Dashboard";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import CreateNoteTab from "./components/elements/createNoteTab/CreateNoteTab";
import Header from "./components/elements/navigation/header/Header";
// import SubHeader from "./components/elements/navigation/subHeader/SubHeader";
import { Home } from "./components/home/Home";
import { Project } from "./components/project/Project";
// import Tabs from "./components/elements/tabs/Tabs";
// import EmployeeHome from "./components/employee/EmployeeHome";
// import EmployeeProjectView from "./components/employee/EmployeeProjectView";
import CreateProject from "./components/elements/createContainer/CreateProject";
import { Test } from "./components/test/Test";
import { useAuth } from "./contexts/AuthProvider";
import { DefaultRoute } from "./routes/defaultRoute";
import { PrivateRoute } from "./routes/privateRoute";
import { PublicRoute } from "./routes/publicRoute";
import { FilePreview } from "./components/elements/filePreview/FilePreview";

function App() {
  const [authState, authDispatch] = useAuth();
  const { user, token } = authState;

  return (
    <Router>
      <div className="wrapper">
        {user && token && <Header />}
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
                <CreateProject />
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
            path="/notes/create"
            element={
              <PrivateRoute redirect="/login">
                <CreateNoteTab />
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
