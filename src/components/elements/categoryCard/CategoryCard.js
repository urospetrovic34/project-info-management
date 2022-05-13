import React, { useEffect, useState } from "react";
import CategoryCardCSS from "../categoryCard/CategoryCard.module.css";
import DeleteButton from "../deleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import CategoryAPI from '../../../actions/category'
import { useMediaQuery } from "react-responsive";

const CategoryCard = (props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleDeleteCategory = (event) => {
        event.stopPropagation();
        mutationCategory.mutate();
    };

    const mutationCategory = useMutation(
        () => {
            return CategoryAPI.remove(props.category.id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("categories");
            },
        }
    );

    const handleNavigate = () => {
        navigate(`/categories/edit/${props.category.id}`);
    };

    return (
        <div onClick={handleNavigate}>
            <div className={CategoryCardCSS.container}>
                <div className={CategoryCardCSS.avatar}>
                    <div className={CategoryCardCSS.name}>
                        <p>{props.category.attributes.name}</p>
                    </div>
                    <div
                        onClick={handleDeleteCategory}
                        className={CategoryCardCSS.delete}
                    >
                        <DeleteButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
