import axios from "../config/axiosConfig";

const count = async () => {
    await axios
        .get("/api/users/count")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

//Strapi plugin for users uses Entity Service API for some reason,
//so this makes pagination quite a challenge to pull off properly,
//because there is no meta object, we have to use start and limit
//params to somehow make it work, we can't use pagination parameter

const get = async (filters, populate, sort, start, limit) => {
    let data;
    await axios
        .get(
            `/api/users?populate=*&limit=8${
                sort ? `&sort=${sort.key}:${sort.value}` : ""
            }`
        )
        .then((res) => {
            data = res.data;
        })
        .catch((err) => {
            return err;
        });
    return data;
};

const getOne = async (id, filters, populate, sort, start, limit) => {
    await axios
        .get(`/api/users/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const getCurrent = async () => {
    await axios
        .get("/api/users/me")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

//Also of notice is that Strapi Entity Services don't require
//additional data object for encapsulation when sending params
//unlike the Strapi REST API

const edit = async (id, data) => {
    await axios
        .put(`/api/users/${id}`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const remove = async (id) => {
    await axios
        .delete(`/api/users/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
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
