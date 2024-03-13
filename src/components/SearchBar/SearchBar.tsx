import React, { useState, useRef, MutableRefObject, FormEvent } from 'react';
import { validateRepo, extractRepoPath } from '../../utils/utils';

type Props = {
    updateRepo: Function
}

const SearchBar = ({ updateRepo }: Props) => {

    let [searchedRepo, setRepoName] = useState("facebook/react");

    let searchBox = useRef<HTMLInputElement>(null);

    const changeSearchBarText = (event: React.ChangeEvent<HTMLInputElement>) => {
        searchBox.current?.setCustomValidity("");
        setRepoName(event.target?.value);
    }

    const searchRepo = (event: FormEvent) => {
        console.log(event);
        event.preventDefault();
        const isValidRepo = validateRepo(searchedRepo.trim());

        if (!isValidRepo) {
            // console.log(searchBox.current, typeof searchBox.current);
            searchBox.current?.setCustomValidity("Please Enter a valid repo");
        } else {
            const repoPath = extractRepoPath(searchedRepo);
            updateRepo(repoPath);
        }
    }


    return (
        <div className="m-2">
            <form onSubmit={searchRepo} className="max-w-md mx-auto">
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input id="search" ref={searchBox} type="search"
                        className="block w-full p-4 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter repo name / url " value={searchedRepo} onChange={changeSearchBarText} required />
                    <button className="text-white absolute inset-y-0 end-0 m-2 bg-blue-700 hover:bg-blue-800 focus:border-black font-medium rounded-lg text-sm px-4 py-2"
                        type="submit">Search</button>
                </div>
            </form>

        </div>
    )
}


export default SearchBar;
