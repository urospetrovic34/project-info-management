import axios from "../config/axiosConfig";

//It will not return res.data directly from .then()
//so we'll make another data variable to store res.data there

const get = async (/*filters, populate, sort, pagination */) => {
    let response;
    await axios
        .get("/api/categories")
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const getOne = async (id, filters, populate, sort, pagination) => {
    let response;
    await axios
        .get(`/api/categories/${id}`)
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const create = async (data) => {
    let response;
    await axios
        .post("/api/categories", data)
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
        .put(`/api/categories/${id}`, data)
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
        .delete(`/api/categories/${id}`)
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const category = {
    get,
    getOne,
    create,
    edit,
    remove,
};

export default category;
