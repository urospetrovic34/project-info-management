import { useQuery, useMutation } from "react-query";
import axios from "axios";

const saveNote = (note) => {
  return axios.post("http://localhost:1337/api/notes", note);
};

export const useSaveNote = () => {
  return useMutation(saveNote);
};

//
