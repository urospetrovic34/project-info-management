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

const get = async (projectId, role, sort) => {
    let response;
    await axios
        .get(
            `/api/users?limit=8${
                sort ? `&sort=${sort.key}:${sort.value}` : ""
            }${projectId ? `&filters[projects][id]=${projectId}` : ""}${
                role ? `&filters[role][type]=${role}` : ""
            }&populate[avatar]=*&populate[role]=*`
        )
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const getV2 = async (sort, name, start) => {
    let response;
    await axios
        .get(
            `/api/users?limit=8${
                sort ? `&sort=${sort.key}:${sort.value}` : ""
            }${
                name
                    ? `&filters[$or][0][name][$containsi]=${name}&filters[$or][1][surname][$containsi]=${name}`
                    : ""
            }${
                start ? `&start=${start * 8}` : "&start=0"
            }&populate[avatar]=*&populate[role]=*&filters[role][name][$notContainsi]=System Administrator`
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
        .get(`/api/users/${id}?populate=*`)
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
        .get("/api/users/me?populate=*")
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

const create = async (data) => {
    let response;
    await axios
        .post("/api/users", data)
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

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
    getV2,
    getOne,
    getCurrent,
    create,
    edit,
    remove,
};

export default user;
