import axios from "axios";
import decode from "jwt-decode";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = (
            localStorage.getItem("remember") === "true"
                ? localStorage
                : sessionStorage
        ).getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            console.log("NAPISI NESTO");
        }
    }
);

export default instance;
