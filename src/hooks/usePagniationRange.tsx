import React, { useMemo } from 'react';
import { getRage } from "../utils/utils";


// contains the pagination range buttons display logic
export const usePaginationRange = ({
    totalPages = 10,
    siblingCount = 1, // refers to the number of pages to display before and after a page
    currentPage = 1
}) => {
    const paginationRange = useMemo(() => {

        // Page nubmers to be displayed = siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        /*
          Case 1:
          If the pages to display is more than the total page numbers, we display all the page numbers
        */
        if (totalPageNumbers >= totalPages) {
            return getRage(1, totalPages);
        }

        /*
            Get the left and right sibling indices and make sure they are within range 1 and totalPages
        */
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );

        /*
          Dont show dots when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPages.
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        /*
            Case 2: No left dots to show, but rights dots to be shown
        */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = getRage(1, leftItemCount);

            return [...leftRange, "...", totalPages];
        }

        /*
        Case 3: No right dots to show, but left dots to be shown
        */
        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = getRage(
                totalPages - rightItemCount + 1,
                totalPages
            );
            return [firstPageIndex, "...", ...rightRange];
        }

        /*
            Case 4: Both left and right dots to be shown
        */
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = getRage(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
        }
    }, [totalPages, currentPage]);

    return paginationRange;
};