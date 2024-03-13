import React, { useEffect, useState } from 'react'
import { getRage } from '../../utils/utils';
import { usePaginationRange } from '../../hooks/usePagniationRange';

type Props = {
    nPages: number,
    currentPage: number,
    setCurrentPage: Function
}
const Pagination = ({ nPages, currentPage, setCurrentPage }: Props) => {

    let paginationRange = usePaginationRange({ totalPages: nPages, siblingCount: 3, currentPage });

    let lastPage = paginationRange && paginationRange[paginationRange.length - 1];

    const goToNextPage = () => {
        if (currentPage !== nPages) setCurrentPage((currentPage: number) => currentPage + 1)
    }
    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage((currentPage: number) => currentPage - 1)
    }

    // If there are less than 2 pages we shall not render the component
    if (!paginationRange || paginationRange.length < 2) {
        return null;
    }



    return (
        <nav className="my-3" aria-label="Pagination">
            <h2 className="sr-only">Pagination</h2>
            <ul className='flex justify-center '>
                {currentPage !== 1 && <li className="border hover:bg-gray-200 px-2 py-1 rounded-md">
                    <button aria-label="Go to previous page" onClick={goToPrevPage}>Previous</button>
                </li>}
                {paginationRange.map(pgNumber => (
                    <li key={pgNumber}
                        className={` border mx-1 rounded-md px-3 py-1 hover:bg-gray-200  md:block
                        ${currentPage === pgNumber ? ' md:bg-gray-300 block' : 'hidden'} 

                        `} >
                        <button onClick={() => setCurrentPage(pgNumber)}
                            aria-current={currentPage === pgNumber ? 'page' : undefined}
                            aria-label={`Go to ${pgNumber} page`}>
                            {pgNumber}
                        </button>
                    </li>
                ))}
                {currentPage !== lastPage && <li className="rounded-md border hover:bg-gray-200 px-2 py-1">

                    <button aria-label="Go to next page" onClick={goToNextPage}>
                        Next
                    </button>
                </li>}
            </ul>
        </nav>
    )
}

export default Pagination