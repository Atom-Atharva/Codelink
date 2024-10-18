import express from "express";

const app = express();

// Request Handler to get User Info
app.get(
    "/user",
    // This function will work as Middlewares
    (req, res, next) => {
        console.log("First Handler");
        next();
    },
    (req, res) => {
        console.log("Second Handler");
        res.send("Second Handler");
    }
);

// Error Handler, It need to be at bottom (Order Matters)
app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something Went Wrong!");
    } 
});
// Request Handler to store User Info
app.post("/user", (req, res) => {
    throw new Error("Something Went Wrong!");
    // res.send("Working...");
});

// Request Handler for /test
app.use("/test", (req, res) => {
    res.send("Testing 1, 2, 3...");
});

// Error Handler, It need to be at bottom (Order Matters)
app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Root Something Went Wrong!");
    }
});

// Server Listening on Port
app.listen(7777, () => {
    console.log("Listening on PORT 7777...");
});
