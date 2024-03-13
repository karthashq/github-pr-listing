import { GITHUB_AUTH_TOKEN } from "../utils/constants"


//a hook to add auth headers if github auth token is provided to the fetch requests
export const useFetchGetAPI = (): Function => {

    const options = {
        headers: {}
    };

    if (GITHUB_AUTH_TOKEN) {
        options.headers = {
            "Authorization": "Bearer " + GITHUB_AUTH_TOKEN,
        };
    }

    return async (url: string) => {
        return await fetch(url, options);
    }


}