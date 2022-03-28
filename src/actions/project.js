import axios from "../config/axiosConfig";

const get = async (filters, populate, sort, pagination) => {
    await axios
        .get("/api/projects")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const getOne = async (id, filters, populate, sort, pagination) => {
    await axios
        .get(`/api/projects/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const create = async (data) => {
    await axios
        .post("/api/projects", data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const edit = async (id, data) => {
    await axios
        .put(`/api/projects/${id}`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const remove = async (id) => {
    await axios
        .delete(`/api/projects/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const project = {
    get,
    getOne,
    create,
    edit,
    remove,
};

export default project;
