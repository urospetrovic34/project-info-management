import axios from "../config/axiosConfig";

//It will not return res.data directly from .then()
//so we'll make another data variable to store res.data there

const get = async (/*filters, populate, sort, pagination */) => {
    let data;
    await axios
        .get("/api/categories")
        .then((res) => {
            data = res.data;
        })
        .catch((err) => {
            return err;
        });
    return data;
};

const getOne = async (id, filters, populate, sort, pagination) => {
    await axios
        .get(`/api/categories/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const create = async (data) => {
    await axios
        .post("/api/categories", data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const edit = async (id, data) => {
    await axios
        .put(`/api/categories/${id}`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const remove = async (id) => {
    await axios
        .delete(`/api/categories/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const category = {
    get,
    getOne,
    create,
    edit,
    remove,
};

export default category;
