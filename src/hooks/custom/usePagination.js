import { useMemo } from "react";

const range = (start, end) => {
    let length = end - start + 1;

    //Create an array of certain length and set the
    //elements within it from start value to the end value
    return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = (currentPage, totalCount, pageSize) => {
    //useMemo hook used for computing the logic of pagination
    //useMemo callback will run when any value in the dependency changes
    const paginationRange = useMemo(() => {
        //calculating the total amount of pages
        //using Math.ceil() to round the number to the
        //next higher integer, so this ensures we have an extra page
        //for the remaining data
        const totalPageCount = Math.ceil(totalCount / pageSize);

        //Total page count which consists of sibling count +
        //first page, last page, current page and 2 dots
        const totalPageNumbers = 1 + 5;

        //In case of the number of pages being less than
        //than the page numbers we want to show in our component
        //we return the range [1,...totalPageCount]
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        //determine left and right sibling index and make sure they are within
        //the range 1 and totalPageCount
        const leftSiblingIndex = Math.max(currentPage - 1, 1);
        const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

        //Don't show dots when there is just one page number to be inserted between the extremes of sibling
        //and the page limits
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * 1;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, "...", totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * 1;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );

            return [firstPageIndex, "...", ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [
                firstPageIndex,
                "...",
                ...middleRange,
                "...",
                lastPageIndex,
            ];
        }
    }, [totalCount, pageSize, currentPage]);

    return paginationRange;
};

export default usePagination;
