import React from "react";
import categoryHooks from "../../hooks/query/category";
import { Select } from "../elements/select/Select";

export const Test = () => {
    const test = categoryHooks.useCategories();
    const data = {
        data: {
            name: "ABCDEFG",
        },
    };
    const mutation2 = categoryHooks.useCreateCategoryMutation();
    const mutation = categoryHooks.useDeleteCategoryMutation();
    const arrayOfOptions = [
        { value: "betmen", label: "BATMAN" },
        { value: "riddler", label: "RIDDLER" },
        { value: "catwoman", label: "CATWOMAN" },
        { value: "penguin", label: "PENGUIN" },
        { value: "carmine falcone", label: "CARMINE FALCONE" },
    ];

    console.log(test);

    const handleTestCreateClick = () => {
        mutation2.mutate(data);
    };

    const handleTestDeleteClick = () => {
        mutation.mutate(test.data.data[test.data.data.length - 1].id);
    };

    return (
        <div>
            <button onClick={handleTestCreateClick}>DODAJ</button>
            <button onClick={handleTestDeleteClick}>BRISI</button>
            {test?.status === "success" &&
                test?.data.data[test.data.data.length - 1].attributes.name}
            <Select options={arrayOfOptions} />
        </div>
    );
};
