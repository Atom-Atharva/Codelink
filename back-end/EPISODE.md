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

---

# Episode 4: Routing and Request Handlers

In this Episode:

1. Routing
2. Request Handlers

## Routing

In routing, order of request handlers matters a lot. For Example-

```js
app.use("/test/2", (req, res) => {
    res.send("Testing from 2!");
});

// Request Handler for /test
app.use("/test", (req, res) => {
    res.send("Testing 1, 2, 3...");
});
```

and

```js
// Request Handler for /test
app.use("/test", (req, res) => {
    res.send("Testing 1, 2, 3...");
});

app.use("/test/2", (req, res) => {
    res.send("Testing from 2!");
});
```

Both will give different results on accessing `localhost:7777/test/2` because of their order.

In first by accessing `/test/2`

```
Output:
Testing form 2!
```

But in second

```
Output:
Testing 1, 2, 3...
```

In routing, request handler can also have `regular expressions` and `regex` like:

1. `ab?c` - `/abc`, `/ac`
2. `ab*cd` - `/abcd`, `/abxyzcd`, etc.
3. `ab+c` - `/abc`, `/abbc`, `/abbbbc`, etc.
4. `a(bc)?d` - `/abcd`, `/ad`

In request handler, we can also pass query parameters as:

```
http:localhost:7777/user?name=atom&password=118
```

```js
// Accessed as
app.get("/user", (req, res) => {
    console.log(req.query);
});
```

Also, we can also make the routes dynamic by:

```js
// Dynamic Routes accessed as
app.get("/user/:userId/:password", (req, res) => {
    console.log(req.params);
});
```

```
http:localhost:7777/user/101/xyz
```

## Request Handlers

For making API Calls we use HTTP Methods like GET, POST, PUT, PATCH, DELETE, etc.
We would be using `Postman` for API Testing.

```js
// Request Handler to get User Info
app.get("/user", (req, res) => {
    res.send({ firstName: "Atharva", lastName: "Sugandhi" });
});

// Request Handler for /test
app.use("/test", (req, res) => {
    res.send("Testing 1, 2, 3...");
});
```

Here, `app.use` will address all the response handler with `/test`, but `app.get` will address only HTTP Method `GET` for the `/user`.
