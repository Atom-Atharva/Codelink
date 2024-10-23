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
