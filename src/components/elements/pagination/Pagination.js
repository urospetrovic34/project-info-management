import React from "react";
import PaginationCSS from "./Pagination.module.css";
import usePagination from "../../../hooks/custom/usePagination";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

export const Pagination = (props) => {
    const paginationRange = usePagination(
        props.currentPage,
        props.totalCount,
        props.pageSize
    );


    if (props.currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        props.onPageChange(props.currentPage + 1);
    };

    const onPrevious = () => {
        props.onPageChange(props.currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={PaginationCSS.container}>
            <li
                className={`${PaginationCSS.item} ${
                    props.currentPage === 1 && PaginationCSS.disabled
                }`}
                onClick={props.handlePreviousPageChange}
            >
                <RiArrowDropLeftLine />
            </li>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === "...") {
                    return <li className={PaginationCSS.dots}>...</li>;
                }
                return (
                    <li
                        key={pageNumber}
                        value={pageNumber}
                        className={`${PaginationCSS.item} ${
                            pageNumber === props.currentPage &&
                            PaginationCSS.selected
                        }`}
                        onClick={props.handlePageChange}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={`${PaginationCSS.item} ${
                    props.currentPage === lastPage && PaginationCSS.disabled
                }`}
                onClick={props.handleNextPageChange}
            >
                <RiArrowDropRightLine />
            </li>
        </ul>
    );
};
