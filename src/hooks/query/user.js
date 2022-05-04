import { useQuery, useMutation, queryClient } from "react-query";
import UserAPI from "../../actions/user";

const useUsers = (projectId, role, sort) => {
    return useQuery(["users", projectId, role, sort], () =>
        UserAPI.get(projectId, role, sort)
    );
};

const useUsersRegular = () => {
    return useQuery(["users"], () => UserAPI.getRegular());
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

const useEditUserMutation = () => {
    return useMutation(
        (id, data) => {
            return UserAPI.edit(id, data);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("users");
            },
        }
    );
};

const useDeleteUserMutation = () => {
    return useMutation(
        (id) => {
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
    useUsersRegular,
    useSingleUser,
    useCurrentUser,
    useCountUsers,
    useEditUserMutation,
    useDeleteUserMutation,
};

export default user;
