import { useQuery, useMutation } from "react-query";
import UploadAPI from "../../actions/upload";

const useUploads = () => {
    return useQuery("uploads", UploadAPI.get);
};

const useSingleUpload = (id) => {
    return useQuery(["upload", id], () => UploadAPI.getOne(id));
};

const useCreateUploadMutation = (formData) => {
    return useMutation(() => {
        return UploadAPI.create(formData);
    });
};

const upload = {
    useUploads,
    useSingleUpload,
    useCreateUploadMutation,
};

export default upload;
