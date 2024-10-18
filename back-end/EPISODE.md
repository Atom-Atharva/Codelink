# Episode 3: Creating our own Express Server

In this episode:

-   Initialize Backend (npm init)
-   Create Express Server

## Initialize Project

After initializing the project we get 2 files:

1. ### package.json

    - It contains all the detail of the project.
    - Its like meta data for the project.
    - Also contain information about dependencies and its versions for the project.
    - Versions have format: `(upgrades)major.minor.patch`
        1. `major`: Breaking Changes.
        2. `minor`: Small Changes, and backward compatible.
        3. `patch`: Bug Fixes.
    - Upgrades have following types:
        1. `^(caret)`: Automatically update to newer version.
        2. `~(tilde)`: Willing to accept any version of the package that is compatible with the version you specify.
        3. `nothing`: Always use this version.

2. ### node_modules

    - It appears when we install any dependency.
    - Contains dependencies and sub-dependencies for the project.

3. ### package-lock.json

    - Gives you the information for exact version of the dependencies.

## Express Server

I have used module js in this project, but Akshay had used common js. To know diff between two types refer previous season notes.

We would see:

1. `.listen` method
2. `Request Handlers`
3. Predefined `scripts` in package.json

## NPM install Flags

-   `-g` : Download Globally.
-   `-D` : Download in Development Only.
