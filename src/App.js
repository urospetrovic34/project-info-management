import React from "react";
import { Login } from "./components/Auth/Login/Login";
import Header from "./components/elements/Navigation/Header/Header";
import SubHeader from "./components/elements/Navigation/SubHeader/SubHeader";
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
