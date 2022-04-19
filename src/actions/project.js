import axios from "../config/axiosConfig";

const get = async (projectName, pagination, userId) => {
  let response;
  await axios
    .get(
      `/api/projects?pagination[pageSize]=12&${pagination && `&pagination[page]=${pagination}`}${
        projectName && `&filters[name][$containsi]=${projectName}`
      }${userId && `&filters[employees][id][$containsi]=${userId}`}&populate=*`
    )
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
    .get(`/api/projects/${id}?populate[notes][populate]=*&populate[logo][populate]=*`)
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
    .post("/api/projects", data)
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
    .put(`/api/projects/${id}`, data)
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
    .delete(`/api/projects/${id}`)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

const project = {
  get,
  getOne,
  create,
  edit,
  remove,
};

export default project;
