import { useQuery, useMutation, queryClient } from "react-query";
import CategoryAPI from "../../actions/category";

const useCategories = () => {
    return useQuery("categories", () => CategoryAPI.get());
};

const useSingleCategory = (id) => {
    return useQuery(["category", id], () => CategoryAPI.getOne(id));
};

const useCreateCategoryMutation = () => {
    return useMutation(
        (data) => {
            return CategoryAPI.create(data);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("categories");
            },
        }
    );
};

const useEditCategoryMutation = () => {
    return useMutation(
        (id, data) => {
            return CategoryAPI.edit(id, data);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("categories");
            },
        }
    );
};

const useDeleteCategoryMutation = () => {
    return useMutation(
        (id) => {
            return CategoryAPI.remove(id);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("categories");
            },
        }
    );
};

const category = {
    useCategories,
    useSingleCategory,
    useCreateCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
};

export default category;
