import { useQuery, useMutation } from "react-query";
import ProjectAPI from "../../actions/project";

const useProjects = () => {
    return useQuery("projects", ProjectAPI.get);
};

const useSingleProject = (id) => {
    return useQuery(["project", id], () => ProjectAPI.getOne(id));
};

const useCreateProjectMutation = (data) => {
    return useMutation(() => {
        return ProjectAPI.create(data);
    });
};

const useEditProjectMutation = (id, data) => {
    return useMutation(() => {
        return ProjectAPI.edit(id, data);
    });
};

const useDeleteProjectMutation = (id) => {
    return useMutation(() => {
        return ProjectAPI.remove(id);
    });
};

const project = {
    useProjects,
    useSingleProject,
    useCreateProjectMutation,
    useEditProjectMutation,
    useDeleteProjectMutation,
};

export default project;
