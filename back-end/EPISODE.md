# Episode 3: Creating our own Express Server

In this episode:

-   [Initialize Backend (npm init)](#initialize-project)
-   [Create Express Server](#express-server)

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

1. [Routing](#routing)
2. [Request Handlers](#request-handlers)

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

1. [Middlewares](#middlewares)
2. [Error Handler](#error-handling)

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

# Episode 6: Database, Schema & Models

In this Episode:

1. [Schema, Models.](#schema-and-model)
2. [Store Data in DB.](#storing-of-data)

```
Note:
Database connection should be made before Backend Connection because we don't want user to make API calls before connecting to Database.

Thus, Server should be listen only when DB Connection is made.
```

## Schema and Model

Defines the structure for the database collection and Model is used to as Class for the Schema and use it to make instances of the model.

```js
import mongoose from "mongoose";

// Creating Schema for the User Model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
});

// Creating Model from User Schema
export const User = mongoose.model("User", userSchema);
```

## Storing of Data

```js
app.post("/signup", async (req, res) => {
    const obj = {
        firstName: "Atharva",
        lastName: "Sugandhi",
        emailId: "admin@email.com",
        password: "Atom118",
    };

    // Creating a new Instance of User Model
    const user = new User(obj);

    // Always Do Error Handling for Async Operations.
    try {
        // Save User Instance to Database
        await user.save();

        // Send Response back to client.
        res.status(200).send("User Added Successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err);
    }
});
```

Inside MongoDB, data will be stored as:

```json
{
    "_id": {
        "$oid": "6713ce8fe8de13491f6daac1"
    },
    "firstName": "Atharva",
    "lastName": "Sugandhi",
    "emailId": "admin@email.com",
    "password": "Atom118",
    "__v": 0
}
```

Here, `_id` and `__v` are created by mongoDB itself.

-   `_id`: Unique ID or ObjectID to uniquely identify an instance.
-   `__v`: It tells the version of the document, how many time it has been updated, etc.

---

# Episode 7: Diving into APIs

In this Episode:

1. [JS Object VS JSON (Difference)](#js-object-vs-json)
2. [APIs (Application Programming Interface)](#api)

## JS Object VS JSON

| JS Object                               | JSON (JavaScript Object Notation)          |
| :-------------------------------------- | :----------------------------------------- |
| Key names do not require double quotes. | Key names must be in double quotes.        |
| Can contain functions as values.        | Cannot contain functions as values.        |
| Used within JavaScript code.            | Used for data interchange between systems. |
| No strict syntax rules.                 | Strict syntax rules.                       |
| Example: `{ name: "Atom" }`             | Example: `{ "name": "Atom" }`              |

## API

Stands for `Application Programming Interface` and is used for fetching and storing information between systems.

While storing the data, data is send from the client to server in the form of JSON, which can be accessed from `req.body` but the JSON need to be parse and converted to JS Object with the help of middleware: `app.use(express.json())`

In Our Project, I have created following APIs:

-   `GET` : To fetch some data.
-   `POST` : To store some data.
-   `DELETE` : To delete some data.
-   `PATCH` : To Update some data without modifying whole resource.
-   `PUT` : To Modify resource data entirely.

```
NOTE:
When Stuck Read Docs. Here, we have referred Mongoose Documentations.
```

---

# Episode 8: Data Sanitization and Schema Validation

In this episode:

1. [Data Sanitization](#data-sanitization)
2. [Schema Validation](#schema-validation)
3. [NPM Express-Validator](#npm-express-validator)

## Data Sanitization

Data sanitization is the process of cleaning data to ensure it is safe to use. This involves removing or modifying data that is incorrect, incomplete, improperly formatted, or potentially harmful.

It is same as API level Validation.

### Why Data Sanitization?

-   Prevents injection attacks.
-   Ensures data integrity.
-   Improves data quality.

```js
// Update User - PATCH /user - Update User Information in DB.
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        // API Level Validation : Data Sanitization
        const ALLOWED_UPDATES = [
            "photoUrl",
            "age",
            "skills",
            "gender",
            "about",
        ];

        // Check if Updates are allowed or not.
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed!");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10.");
        }

        // Any other data, which is not in Schema will get ignored. Ex: userId.
        await User.findByIdAndUpdate(userId, data, {
            // Explicitly Allow Validator to run on this request.
            runValidators: true,
        });
        res.status(200).send("User Updated Successfully!");
    } catch (error) {
        res.status(400).send("Update Failed: ", error);
    }
});
```

## Schema Validation

Schema validation ensures that the data being stored in the database adheres to a defined structure. This is crucial for maintaining data integrity and consistency.

### Implementing Schema Validation

In MongoDB with Mongoose, you can define validation rules directly in your schema.

#### Example:

```js
import mongoose from "mongoose";

// Creating Schema for the User Model
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 20,
        },
        lastName: {
            type: String,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            // Validate Function for Custom Check (By default on new entries only)
            // To work on other requests, allow explicitly.
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is not valid");
                }
            },
        },
        photoUrl: {
            type: String,
            default:
                "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png",
        },
        about: {
            type: String,
            default: "This is the default about of the user!",
        },
        skills: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

// Creating Model from User Schema
export const User = mongoose.model("User", userSchema);
```

In this schema, `emailId` must be unique and mandatory, while `gender` contains a custom validator which needs to be called explicitly for request which are not creating new entries.

```js
// Any other data, which is not in Schema will get ignored. Ex: userId.
await User.findByIdAndUpdate(userId, data, {
    // Explicitly Allow Validator to run on this request.
    runValidators: true,
});
```

By combining data sanitization and schema validation, you can ensure that your application handles data securely and consistently.

## NPM Express-Validator

It is an external library for validation: `npm i validator`, create your custom validators for API Level or Schema Level Protection.

```js
// Schema Level Validation
emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email Address: ", value);
                }
            },
        },
```

`NOTE:` Never Trust `req.body`, Always keep **validations**.

---

# Episode 9: Encrypting Passwords

In this Episode:

1. [Encryption](#encryption)

## Encryption

Password in DB should be hidden from everyone, thus we need to encrypt password for user integrity and security. We will be using `bcrypt` library for hashing the passwords.

Created `/signup` and `/login` routes inside application with `brcyption` on passwords.

`NOTE:` DO NOT Provide Extra Information in Errors (Information Leaking). For example: Do not throw error message like "User Not Registered in DB" or "Password Incorrect", instead use "Invalid Credentials".

---

# Episode 10: Authentication, JWT & Cookies

In this Episode:

1. [Authentication Middleware](#authentication-middleware)
2. [JWT](#jwt)
3. [Cookies](#cookies)
4. [Mongoose Schema Methods](#mongoose-schema-methods)

## Authentication Middleware

Authentication middleware is used to `protect routes` from unauthorized access. It verifies the user's identity before allowing access to certain endpoints.

Server will send a `token` to client after successful login, which will be used to authenticate the user for further requests.

## JWT

JWT stands for `JSON Web Token`. It is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

It is used to authenticate the user by sending a token to the client after successful login.

Token must have an `expiry` because of security reasons like take a scenario where you are accessing a website from others computer and you forgot to logout, if site jwt don't have an expiry then it will remain logged in on other computer and can be misused.

## Cookies

Cookies are small pieces of data that are stored in the `user's browser`. They are used to store information about the user's session, such as login status, shopping cart items, etc.

In our project, we will be using cookies to store the JWT token for authentication. These cookies has a `expiry` after which the user needs to regenerate JWT Token.

```js
// To send cookie to user
res.cookie("Token", "Cookie Data HERE.");
```

```js
// To Access ALL the Cookies from Request
const cookie = req.cookies;
```

## Mongoose Schema Methods

Some methods are very close to schema like creating a jwt token, thus these methods can be offloaded to schema level methods.

```js
// Schema Methods
// Don't use Arrow Methods because "this" keyword works with normal functions and doesn't work with arrow functions.
userSchema.method.getJWT = async function () {
    // Get Instance of Current User.
    const user = this;

    // Generate Token for the User.
    const token = await jwt.sign({ _id: user._id }, SECRET_KEY_JWT, {
        expiresIn: "7d",
    });

    // Return the Token
    return token;
};
```

---

# Episode 11: Diving Into APIs and Express Router

In this Episode:

1. [APIs for CodeLink](#api-list-low-level-designing-api-designing)
2. [Express Router](#express-router)

## API List (Low Level Designing) (API Designing)

Lets finalize the API Designing for CodeLink

### Auth APIs

-   POST `/signup`
-   POST `/login`
-   POST `/logout`

### Profile APIs

-   GET `/profile/view`
-   PATCH `/profile/edit`
-   PATCH `/profile/password`

### Connection Request APIs

```
Status:
    - Ignore
    - Interested
    - Accepted
    - Rejected
```

-   POST `/request/send/interested/:userId`
-   POST `/request/send/ignored/:userId`
-   POST `/request/review/accepted/:requestId`
-   POST `/request/review/rejected/:requestId`

### User APIs

-   GET `/user/connections` : What connections I am matched with.
-   GET `/user/requests/received`
-   GET `/user/feed` : Get you the

## Express Router

For have a good `readability` over the code, we use routers to have `modularity` inside the code. It is basically a `logical separation` of the code.

We would be using `express router` to achieve the modularity inside the code.

```js
// In App.js
// Middlewares for Route Handlers, check line by line for correct request handler.
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
```

```js
// In Profile.Router.js
import express from "express";
import userAuth from "../middlewares/auth.middlerware.js";

const profileRouter = express.Router();

// Profile API - GET /profile - Get User Profile and needs to verify JWT Token before passing to Request Handler.
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        // Get user from Request as passed in auth middleware
        const { user } = req;
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

export default profileRouter;
```

---

# Episode 12: Logical DB Query and Compound Indexes

In this Episode:

1. Created Connection Request DB
2. [Compound Indexing in DB](#compound-indexing-in-db)
3. [Logical DB Query](#logical-db-query)

## Compound Indexing in DB

As our project grows, the Database will contain millions of data, to scale things up, we need to optimize our DB using indexing in our DB, so that APIs become faster.

In our project we need to use indexing on emailId field but mongoDB automatically applies indexing on fields with `unique: true`.

Also in our `connectionRequest.model.js`, we need to use indexing on 2 fields together (toUserId, fromUserId) thus creating a `compound index`.

```js
// Compound Index
// 1 : Ascending
// -1 : Descending
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
```

Read more about index from the [article](https://www.mongodb.com/resources/basics/databases/database-index).

## Logical DB Query

To perform logical operations in the DB Query, we use Logical DB Queries like `$or`, `$and`, `$not`, `$nor`.

Read more about in the [article](https://www.mongodb.com/docs/manual/reference/operator/query-logical/)

```js
// If there is an existing ConnectionRequest
const existingConnectionRequest = await ConnectionRequest.findOne({
    $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
    ],
});
```

---

# Episode 13: ref, Populate & Thought Process of writing APIs

In this Episode:

1. [Thought Process : POST vs GET APIs](#thought-process-of-post-vs-get-apis)
2. [Ref and Populate](#ref-and-populate)

## Thought Process of POST vs GET APIs

1. **POST APIs**

-   In post request, we validate the data because if we don't then the server is vulnerable to hackers as they can find a loop hole in the server and insert their data inside our DB, which is dangerous.

-   That is why, we need to verify each and every thing which is coming inside our DB.

2. **GET APIs**

-   Here, we are sending things to user, thus we must be very sure that we are only sending specific data to authorized user.

## Ref and Populate

When we want to access instance of an Object which is mentioned in `this` Object, we can either make a DB call `findById` and get the other objects data or we can use `ref` and `populate` to get the data.

It is like replacement for `JOINS`.

```js
// In Connection Request Schema
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // reference to the user collection
            required: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
```

```js
// While Fetching Connection Request
const connectionRequest = await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status: "interested",
}).populate("fromUserId", ["firstName", "lastName"]);
```

---

# Episode 14: Building Feed API and Pagination

In this Episode:

1. Feed API
2. [Pagination](#pagination)

## Pagination

When API is been throttled to send certain number of response and not all response is called pagination, i.e, it restricted the number of results it needs to send to client.

In Codelink, we can restrict the feed to 10 users at a time, and we need to call API again to get 10 more users.

```
1. /user/feed?page=1&limit=10 => First 10 user (1-10)
2. /user/feed?page=2&limit=10 => Second 10 user (11-20)
3. /user/feed?page=3&limit=10 => Third 10 user (21-30)
```

In mongoDB we some amazing function `.skip()` & `.limit()`

```
1. .skip(0) & .limit(10)
2. .skip(10) & .limit(10)
3. .skip(20) & .limit(10)
```

```js
// Coding Example for Pagination:

// Get Params from URL
const page = parseInt(req.query.page) || 1; // Convert to INT

// Validate Limit (Upper Bound)
let limit = parseInt(req.query.limit) || 10;
limit = limit > 50 ? 50 : limit;

const skip = (page - 1) * limit;

// Get All users not in hideUserFromFeed List
const users = await User.find({
    // Convert Set To Array
    $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } }, // Not in Array
        { _id: { $ne: loggedInUser._id } }, // Not Equal
    ],
})
    .select(USER_SAFE_DATA)
    // Pagination Applied
    .skip(skip)
    .limit(limit);
```

---
