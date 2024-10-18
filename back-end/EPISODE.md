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

---

# Episode 5: Middlewares & Error handlers

In this Episode we will learn about:

1. Middlewares
2. Error Handler

## Middlewares

Middleware is a request handler that allows you to intercept and manipulate requests and responses before they reach route handlers. They are the functions that are invoked by the Express.js routing layer.

An `app.use or app.get` can have multiple handlers.

```js
// Request Handler to get User Info
app.get(
    "/user",
    (req, res, next) => {
        console.log("First Handler");
        // This will call the next handler here.
        next();
    },
    (req, res) => {
        console.log("Second Handler");
        res.send("Second Handler");
    }
);
```

Using `next()` method we can move onto next handler and execute its operations. So, All the in between handlers will work as Middlewares.

If `next()` is not present at any Middleware, the app will hang there till request has been timed out.

`NOTE`: Once a response had been send to the client, another response cannot be send again on same request.

### Use of Middlewares

-   Pre-execute some operations and checks.
-   Used for Pre-processing of data before final procedure (Route Handler).

### Flow of Request

`GET /user` - It checks all the app.xxx("matching route") function till it sends back response otherwise it will hang to infinity.

```
GET /user => Middleware Chain => Request Handler
```

## Error Handling

What if there is some error occurred in request handler? We need to handle it with:

1. **Try-Catch Block**

```js
// Request Handler to store User Info
app.post("/user", (req, res) => {
    try {
        res.send("Updated User Info!");
    } catch (error) {
        res.status(500).send("Something Went Wrong!");
    }
});
```

2. **Error Handlers**

```js
// Error Handler, It need to be at bottom (Order Matters)
app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something Went Wrong!");
    }
});
```

---
