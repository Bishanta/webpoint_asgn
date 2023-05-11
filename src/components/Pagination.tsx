import { useMemo, Dispatch, SetStateAction } from "react";
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PaginationProps {
    setParams: Dispatch<SetStateAction<any>>;
    params: {
      page: number;
      hitsPerPage: number;
    };
    total: number;
  }

export default function Pagination({ setParams, params, total }: PaginationProps) {
    const totalPages = Math.ceil(total / params.hitsPerPage)

    const paginationRange = usePagination({ currentPage: params.page, totalCount: total, siblingCount: 3, pageSize: params.hitsPerPage })
    return <div className="flex items-center justify-center space-x-4 my-5">
        <button
            className={`w-8 h-8 flex items-center text-white justify-center ${params.page === 0 ? 'bg-gray-300 cursor-default' : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                }`}
            disabled={params.page === 0}
            onClick={() => {
                if (params.page > 0) setParams({ ...params, page: params.page - 1 });
            }}
        >
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {paginationRange && paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
                return (
                    <span key={index} className="w-8 h-8 flex items-center text-gray-500 font-medium">
                        ...
                    </span>
                );
            }
            return (
                <button
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center ${Number(pageNumber) - 1 === params.page ? 'cursor-default font-bold' : 'cursor-pointer'
                        }`}
                    onClick={() => setParams({ ...params, page: Number(pageNumber) - 1 })}
                >
                    {pageNumber}
                </button>
            );
        })}
        <button
            className={`w-8 h-8 flex items-center text-white justify-center ${params.page + 1 === totalPages || params.page + 1 === 100 ? 'bg-gray-300 cursor-default' : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                }`}
            disabled={params.page + 1 === totalPages || params.page + 1 === 100}
            onClick={() => {
                if (params.page + 1 < totalPages) setParams({ ...params, page: params.page + 1 });
            }}
        >
            <FontAwesomeIcon icon={faAngleRight} />
        </button>
    </div>
}


export const DOTS = '...';

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}: {
    totalCount: number,
    pageSize: number,
    siblingCount?: number,
    currentPage: number
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize) < 100 ? Math.ceil(totalCount / pageSize) : 100;

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        /*
          We do not want to show dots if there is only one position left 
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want
        */
        const shouldShowLeftDots = leftSiblingIndex > 1;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};

