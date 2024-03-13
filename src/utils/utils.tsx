import { REPO_URL, REPO_URL_PULLS, SIMPLE_REPO } from "./constants";




export const validateRepo = (input: string) => {
    return SIMPLE_REPO.test(input) || REPO_URL.test(input) || REPO_URL_PULLS.test(input);
}

export const extractRepoPath = (input: string) => {
    if (SIMPLE_REPO.test(input)) {
        return input;
    } else if (REPO_URL.test(input)) {
        return input.replace("https://github.com/", "");
    } else if (REPO_URL_PULLS.test(input)) {
        return input.replace("https://github.com/", "").replace("/pulls", "");
    } else {
        throw Error("invalid repository");
    }
}


export const getRage = (start: number, end: number): number[] => {
    let length = end - start + 1;
    /*
        Example : start -1 end- 5 will return [1,2,3,4,5]
    */
    return Array.from({ length }, (_, idx) => idx + start);
};


// export const daysBefore = (date: Date) :number => {
//     return (new Date() - date) / (24 * 60 * 60 * 1000);
// }