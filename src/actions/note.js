import axios from "../config/axiosConfig";

const get = async (filters, populate, sort, pagination) => {
    await axios
        .get("/api/notes")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const getOne = async (id, filters, populate, sort, pagination) => {
    await axios
        .get(`/api/notes/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const create = async (data) => {
    await axios
        .post("/api/notes", data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const edit = async (id, data) => {
    await axios
        .put(`/api/notes/${id}`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const remove = async (id) => {
    await axios
        .delete(`/api/notes/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const note = {
    get,
    getOne,
    create,
    edit,
    remove,
};

export default note;
