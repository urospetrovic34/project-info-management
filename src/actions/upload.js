import axios from "../config/axiosConfig";

const get = async () => {
    await axios
        .get("/api/upload")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const getOne = async (id) => {
    await axios
        .get(`/api/upload/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const create = async (formData) => {
    await axios
        .post(`/api/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const upload = {
    get,
    getOne,
    create,
};

export default upload;
