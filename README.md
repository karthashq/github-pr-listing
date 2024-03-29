# Getting Started with Create React App

You can see the live version of the app at [https://gh-repo-pr-list.web.app/](https://gh-repo-pr-list.web.app/)

## How to run it?

Generate a github access token following the steps provided in the link below:

[https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

Now, put your token in the file `src/utils/constants.tsx` under `GITHUB_AUTH_TOKEN`. Doing this will hit the APIs with your github access token in the header. 

It should still work without following the above steps, since Github still provides us limited accessibility without the tokens.



In the project directory, you can run:

`npm install` followed by `npm start` to run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

It will reload if you make edits. You will also see any lint errors in the console.



## Things to fix

1. allow hypens(-) in repo names
2. disable the button "..." in the pagination.
3. Handle the search validation in a better way.
