import { useQuery, useMutation } from "react-query";
import UserAPI from "../../actions/user";

const useUsers = () => {
    return useQuery("users", UserAPI.get);
};

const useSingleUser = (id) => {
    return useQuery(["user", id], () => UserAPI.getOne(id));
};

//I don't think it was necessary to make this one into a hook function,
//but whatever

const useCountUsers = () => {
    return useQuery("userCount", UserAPI.count);
};

const useEditUserMutation = (id, data) => {
    return useMutation(() => {
        return UserAPI.edit(id, data);
    });
};

const useDeleteUserMutation = (id) => {
    return useMutation(() => {
        return UserAPI.remove(id);
    });
};

const user = {
    useUsers,
    useSingleUser,
    useCountUsers,
    useEditUserMutation,
    useDeleteUserMutation,
};

export default user;
