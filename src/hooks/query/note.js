import { useQuery, useMutation, queryClient } from "react-query";
import NoteAPI from "../../actions/note";

const useNotes = () => {
    return useQuery("notes", NoteAPI.get);
};

const useSingleNote = (id) => {
    return useQuery(["note", id], () => NoteAPI.getOne(id));
};

const useCreateNoteMutation = (data) => {
    return useMutation(
        () => {
            return NoteAPI.create(data);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("notes");
            },
        }
    );
};

const useEditNoteMutation = (id, data) => {
    return useMutation(
        () => {
            return NoteAPI.edit(id, data);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("notes");
            },
        }
    );
};

const useDeleteNoteMutation = (id) => {
    return useMutation(
        () => {
            return NoteAPI.remove(id);
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries("notes");
            },
        }
    );
};

const note = {
    useNotes,
    useSingleNote,
    useCreateNoteMutation,
    useEditNoteMutation,
    useDeleteNoteMutation,
};

export default note;
