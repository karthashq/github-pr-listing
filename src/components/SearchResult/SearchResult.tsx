import React, { useEffect, useState } from 'react';
import { GET_REPO_DETAILS, GITHUB_AUTH_TOKEN } from '../../utils/constants';
import PRListingTable from '../PRListingTable/PRListingTable';
import { useFetchGetAPI } from '../../hooks/useFetchGetAPI';


type Props = { repo: string };



const SearchResult = ({ repo }: Props) => {

  const callGitHubAPI = useFetchGetAPI();

  useEffect(() => {
    getRepoDetails();
  }, [repo]);


  const getRepoDetails = async () => {
    try {
      let response = await callGitHubAPI(GET_REPO_DETAILS.replace("%OWNER/REPO%", repo));
      response = await response.json();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <h3 className="text-2xl p-3 text-center text-blue-700">{repo}</h3>
      {/* Display more repo details here */}
      <PRListingTable repo={repo} />
    </>
  )
}

export default SearchResult;


