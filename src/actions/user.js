import axios from "../config/axiosConfig";

const count = async () => {
    let response;
    await axios
        .get("/api/users/count")
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

//Strapi plugin for users uses Entity Service API for some reason,
//so this makes pagination quite a challenge to pull off properly,
//because there is no meta object, we have to use start and limit
//params to somehow make it work, we can't use pagination parameter

const get = async (filters, populate, sort, start, limit) => {
    let response;
    await axios
        .get(
            `/api/users?populate=*&limit=8${
                sort ? `&sort=${sort.key}:${sort.value}` : ""
            }`
        )
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const getOne = async (id, filters, populate, sort, start, limit) => {
    let response;
    await axios
        .get(`/api/users/${id}`)
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const getCurrent = async () => {
    let response;
    await axios
        .get("/api/users/me")
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

//Also of notice is that Strapi Entity Services don't require
//additional data object for encapsulation when sending params
//unlike the Strapi REST API

const edit = async (id, data) => {
    let response;
    await axios
        .put(`/api/users/${id}`, data)
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const remove = async (id) => {
    let response;
    await axios
        .delete(`/api/users/${id}`)
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const user = {
    count,
    get,
    getOne,
    getCurrent,
    edit,
    remove,
};

export default user;
