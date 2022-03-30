import { useQuery, useMutation } from "react-query";
import { queryClient } from "../..";
import UserAPI from "../../actions/user";

const useUsers = () => {
    return useQuery("users", () => UserAPI.get());
};

const useSingleUser = (id) => {
    return useQuery(["user", id], () => UserAPI.getOne(id));
};

const useCurrentUser = (id) => {
    return useQuery("userCurrent", UserAPI.getCurrent);
};

//I don't think it was necessary to make this one into a hook function,
//but whatever

const useCountUsers = () => {
    return useQuery("userCount", UserAPI.count);
};

const useEditUserMutation = (id, data) => {
    return useMutation(
        () => {
            return UserAPI.edit(id, data);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("users");
            },
        }
    );
};

const useDeleteUserMutation = (id) => {
    return useMutation(
        () => {
            return UserAPI.remove(id);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("users");
            },
        }
    );
};

const user = {
    useUsers,
    useSingleUser,
    useCurrentUser,
    useCountUsers,
    useEditUserMutation,
    useDeleteUserMutation,
};

export default user;
