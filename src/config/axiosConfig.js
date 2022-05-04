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
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                axios
                    .post("/api/auth/refreshToken")
                    .then((res) => console.log(res));
            }
            if (error.response.status !== 401) {
                return Promise.reject(error.response.data);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
