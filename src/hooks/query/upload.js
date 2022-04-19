import { useQuery, useMutation } from "react-query";
import { queryClient } from "../..";
import UploadAPI from "../../actions/upload";

const useUploads = () => {
  return useQuery("uploads", UploadAPI.get);
};

const useSingleUpload = (id) => {
  return useQuery(["upload", id], () => UploadAPI.getOne(id));
};

const useCreateUploadMutation = () => {
  return useMutation(
    (formData) => {
      return UploadAPI.create(formData);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("uploads");
      },
      onSuccess: async (resp) => {
        console.log(resp);
      },
    }
  );
};

const upload = {
  useUploads,
  useSingleUpload,
  useCreateUploadMutation,
};

export default upload;
