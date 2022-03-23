import axios from "axios";

const instance = axios.create({
    baseURL: process.env.API_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
    }
);

export default instance;
