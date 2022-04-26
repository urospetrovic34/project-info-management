import axios from "../config/axiosConfig";

const get = async () => {
  let response;
  await axios
    .get("/api/upload")
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const getOne = async (id) => {
  let response;
  await axios
    .get(`/api/upload/files/${id}`)
    .then((res) => {
      response = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const create = async (formData) => {
  let response;
  await axios
    .post(`/api/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const upload = {
  get,
  getOne,
  create,
};

export default upload;
