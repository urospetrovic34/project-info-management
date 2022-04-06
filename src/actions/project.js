import axios from "../config/axiosConfig";

const get = async (filter,/*, populate, sort, */ pagination) => {
    let data;
    await axios
        .get(
            `/api/projects?pagination[pageSize]=12&${
                pagination && `&pagination[page]=${pagination}`
            }${filter && `&filters[name][$containsi]=${filter}`}&populate=*`
        )
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
