import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CombinedProvider from "./utils/CombinedProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { ErrorProvider } from "./contexts/ErrorProvider";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

if (!localStorage.getItem("remember")) {
    localStorage.setItem("remember", "false");
}

ReactDOM.render(
    <>
        <QueryClientProvider client={queryClient}>
            <CombinedProvider components={[AuthProvider, ErrorProvider]}>
                <App />
            </CombinedProvider>
        </QueryClientProvider>
    </>,
    document.getElementById("root")
);
