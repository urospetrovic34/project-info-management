import axios from "../config/axiosConfig";

const get = async (filters, populate, sort, pagination) => {
    let response;
    await axios
        .get("/api/notes")
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
        .get(`/api/notes/${id}`)
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
        .post("/api/notes", data)
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
        .put(`/api/notes/${id}`, data)
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
        .delete(`/api/notes/${id}`)
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            return err;
        });
    return response;
};

const note = {
    get,
    getOne,
    create,
    edit,
    remove,
};

export default note;
