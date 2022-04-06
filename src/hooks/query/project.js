import { useQuery, useMutation } from "react-query";
import { queryClient } from "../..";
import ProjectAPI from "../../actions/project";

const useProjects = (filter,pagination) => {
    return useQuery(["projects",filter,pagination], () => ProjectAPI.get(filter,pagination));
};

const useSingleProject = (id) => {
    return useQuery(["project", id], () => ProjectAPI.getOne(id));
};

const useCreateProjectMutation = (data) => {
    return useMutation(
        () => {
            return ProjectAPI.create(data);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("projects");
            },
        }
    );
};

const useEditProjectMutation = (id, data) => {
    return useMutation(
        () => {
            return ProjectAPI.edit(id, data);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("projects");
            },
        }
    );
};

const useDeleteProjectMutation = (id) => {
    return useMutation(
        () => {
            return ProjectAPI.remove(id);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("projects");
            },
        }
    );
};

const project = {
    useProjects,
    useSingleProject,
    useCreateProjectMutation,
    useEditProjectMutation,
    useDeleteProjectMutation,
};

export default project;
