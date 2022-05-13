import React from "react";
import SystemAdminPageCSS from "../systemAdminPage/SystemAdminPage.module.css";
import categoryHooks from "../../hooks/query/category";
import { Pagination } from "../elements/pagination/Pagination";
import Input from "../elements/input/Input";
import Button from "../elements/button/Button";
import { Select } from "../elements/select/Select";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/custom/useDebounce";
import CategoryCard from "../elements/categoryCard/CategoryCard";

export const CategoriesAdminPage = () => {
    const categories = categoryHooks.useCategories();
    console.log(categories);

    const handleCategoryFilter = () => {};

    const sortCategoryOptions = () => {};

    return (
        <div className={SystemAdminPageCSS.container}>
        <div className={SystemAdminPageCSS.row}>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/categories">Categories</Link>
        </div>
            <div className={SystemAdminPageCSS.flex}>
                <div className={SystemAdminPageCSS.search_container}>
                    <div>
                        <Input
                            placeholder={"Search categories..."}
                            onChange={handleCategoryFilter}
                        />
                    </div>
                    <div className={SystemAdminPageCSS.select}>
                        <Select
                            placeholder={"Sort by..."}
                            options={sortCategoryOptions}
                            multi={false}
                            isSearchable={false}
                        />
                    </div>
                </div>
                <div className={SystemAdminPageCSS.btn}>
                    <Link to="/categories/create">
                        <Button text=" + Add Category" />
                    </Link>
                </div>
            </div>
            <div className={SystemAdminPageCSS.card_container}>
                {categories.status === "success" && categories.data?.data?.map((category) => <CategoryCard key={category.id} category={category} />)}
            </div>
            <div className={SystemAdminPageCSS.pagination}>
                {/* {users.status === "success" && (
          <Pagination
            currentPage={users.data?.meta?.pagination.page}
            totalCount={users.data?.meta?.pagination.total}
            pageSize={users.data?.meta?.pagination.pageSize}
            handlePageChange={handlePageChange}
            handleNextPageChange={handleNextPageChange}
            handlePreviousPageChange={handlePreviousPageChange}
          />
        )} */}
            </div>
        </div>
    );
};
