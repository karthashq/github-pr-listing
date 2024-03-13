import React, { useState, useEffect } from 'react'
import Pagination from '../Pagination/Pagination';
import { GET_PR_DETAIL_URL, GET_PULL_REQUESTS_URL } from '../../utils/constants';


type Props = { repo: string };

export type prData = {
    title: string,
    author: string,
    comments: number,
    prNo: number,
    created_at: Date,
    pr_url: URL,
    user_link: URL
};

const recordsPerPage = 10;

const PRListingTable = ({ repo }: Props) => {

    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);

    let [prList, setPRList] = useState<prData[]>();

    let totalPages = 1;


    useEffect(() => {
        getPullRequests(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        getPullRequests(currentPage);
    }, [repo]);



    const getPullRequests = async (page: number) => {
        try {
            setIsLoading(true);
            setPRList(undefined);
            const request_url = GET_PULL_REQUESTS_URL.replace("%OWNER/REPO%", repo).replace("%page%", page.toString()).replace("%per_page%", recordsPerPage.toString());
            let response: any = await fetch(request_url);

            /* fetching the last page number from the response headers */

            const linkHeader = response.headers.get("link");
            let lastPageLink = linkHeader.match(/(?<=<)([\S]*)(?=>; rel="last")/i)[0]; // matching the last link
            totalPages = +lastPageLink.match(/page=\d+/)[0].replace('page=', "");

            console.log(totalPages);
            response = await response.json();

            let data: prData[] = response.map((data: any) => {
                return {
                    title: data.title,
                    author: data.user?.login,
                    comments: Math.floor(Math.random() * 10),
                    prNo: data.number,
                    created_at: new Date(data.created_at),
                    pr_url: data.html_url,
                    user_link: data.user?.html_url
                }
            });


            const neededComments = false;
            //setting random comments to avoid API calls,(to avoid API limmiter issue)
            if (neededComments) {
                //setting up the comments seperately as unable to find comments count in the GET_PULL_REQUESTS_URL listing API
                await setCommentsinPRList(data);
            } else {
                setPRList(data);
            }

            setIsLoading(false);


        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }



    const setCommentsinPRList = async (data: prData[]) => {
        try {
            const updatedData: prData[] = [];

            for (let i = 0; i < data.length; i++) {
                let prInfo = data[i];
                const request_url = GET_PR_DETAIL_URL.replace("%OWNER/REPO%", repo).replace("%PR_ID%", prInfo.prNo.toString());
                let response: any = await fetch(request_url);
                response = await response.json();
                // console.log(request_url, response.comments);
                prInfo.comments = response.comments;
                updatedData.push(prInfo);
            }

            console.log(updatedData);
            setPRList(updatedData);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }


    return (
        <div className="md:w-[100%] md:mx-auto">
            {isLoading && <p className='text-xl font-bold w-72 h-72 pt-32 mx-auto text-center rounded-lg'>Loading.....</p>}
            {!isLoading && !prList && <p className="text-xs font-bold w-72 h-72 pt-32 mx-auto text-center rounded-lg md:text-base text-red-600">Repository Not Found, Please enter a valid repository.</p>}

            {prList && <>
                <Pagination aria-hidden="true" nPages={15} currentPage={currentPage} setCurrentPage={setCurrentPage} ></Pagination>
                <table className="table-fixed md:table-auto md:w-[900px] text-xs mx-auto bg-white rounded-lg md:text-base border">
                    <thead className='bg-gray-100 text-gray-700'>
                        <tr className="h-12 text-sm">
                            <th scope="col" className='w-[80%] '>Name</th>
                            <th scope="col" className='px-3'>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prList && prList.map((data: prData) => {
                            return <tr key={data.prNo} className='bg-white border-b hover:bg-gray-200'>
                                <td>
                                    <div>
                                        <div className="flex px-2 py-1">
                                            <span className="pr-2 pt-1">
                                                <svg style={{ fill: "green" }} viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path></svg>
                                            </span>
                                            <span className='hover:text-blue-700 cursor-pointer font-semibold max-w-full text-ellipsis max-h-12 text-wrap overflow-hidden' title={data.title}><a href={data.pr_url.toString()} target="_blank">{data.title}</a></span>
                                        </div>
                                        <div className="px-2 py-1">
                                            <span className="font-semibold">#{data.prNo}</span>
                                            {" raised by "}
                                            <span className="underline hover:text-blue-700 cursor-pointer'"><a href={data.user_link.toString()} target="_blank">{data.author}</a></span>
                                            {" on "}
                                            <span>{data.created_at.toDateString()}</span>.
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center px-2 py-1 hover:cursor-pointer'>
                                        <div className="pt-1 pr-1">
                                            <svg style={{ fill: "black hover:text-blue-700" }} aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                                                <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            {data.comments}
                                        </div>

                                    </div></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <Pagination nPages={15} currentPage={currentPage} setCurrentPage={setCurrentPage} ></Pagination>
            </>
            }
        </div >
    )
}

export default PRListingTable