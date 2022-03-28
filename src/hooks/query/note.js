import { useQuery, useMutation } from "react-query";
import NoteAPI from "../../actions/note";

const useNotes = () => {
    return useQuery("notes", NoteAPI.get);
};

const useSingleNote = (id) => {
    return useQuery(["note", id], () => NoteAPI.getOne(id));
};

const useCreateNoteMutation = (data) => {
    return useMutation(() => {
        return NoteAPI.create(data)
    });
}

const useEditNoteMutation = (id, data) => {
    return useMutation(() => {
        return NoteAPI.edit(id, data);
    });
};

const useDeleteNoteMutation = (id) => {
    return useMutation(() => {
        return NoteAPI.remove(id);
    });
};

const note = {
    useNotes,
    useSingleNote,
    useCreateNoteMutation,
    useEditNoteMutation,
    useDeleteNoteMutation,
};

export default note;

