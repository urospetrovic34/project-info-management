import axios from "../config/axiosConfig";

const get = async (projectName, pagination, userId) => {
    let data;
    await axios
        .get(
            `/api/projects?pagination[pageSize]=12&${
                pagination && `&pagination[page]=${pagination}`
            }${projectName && `&filters[name][$containsi]=${projectName}`}${
                userId && `&filters[employees][id][$containsi]=${userId}`
            }&populate=*`
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
    let data;
    await axios
        .get(`/api/projects/${id}?populate[notes][populate]=*&populate[logo][populate]=*`)
        .then((res) => {
            data = res.data;
        })
        .catch((err) => {
            return err;
        });
    return data;
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
