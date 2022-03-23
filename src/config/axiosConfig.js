import axios from "axios";

const instance = axios.create({
    baseURL: 'https://murmuring-cove-46165.herokuapp.com',
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
