import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';
//getting note from server
const getAll = () => {
  return axios.get(baseUrl);
};
//adding a note to server
const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};
//update resource
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

//return from this module
const noteServices = {
  getAll: getAll,
  create: create,
  update: update,
};

export default noteServices;
