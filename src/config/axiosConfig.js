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
            const user = decode(token);
            console.log(user);
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.log(error);
    }
);

export default instance;
