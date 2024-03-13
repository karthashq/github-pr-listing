

export const SIMPLE_REPO = /^\w+\/\w+$/;

export const REPO_URL = /^https:\/\/github\.com\/\w+\/\w+$/;

export const REPO_URL_PULLS = /^https:\/\/github\.com\/\w+\/\w+\/pulls$/;

export const GET_REPO_DETAILS = "https://api.github.com/repos/%OWNER/REPO%";

export const GET_PULL_REQUESTS_URL = "https://api.github.com/repos/%OWNER/REPO%/pulls?page=%page%&per_page=%per_page%";

// returns more info for the particular PR number(currently used to get the comments count)
export const GET_PR_DETAIL_URL = "https://api.github.com/repos/%OWNER/REPO%/pulls/%PR_ID%";


