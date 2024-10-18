import express from "express";

const app = express();

// Request Handler for /test
app.use("/test", (req, res) => {
    res.send("Testing 1, 2, 3...");
});

// Request Handler for /
app.use((req, res) => {
    res.send("Hello from the Server!");
});

// Server Listening on Port
app.listen(7777, () => {
    console.log("Listening on PORT 7777...");
});
