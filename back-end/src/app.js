import express from "express";

const app = express();

// Request Handler to get User Info
app.get("/user", (req, res) => {
    res.send({ firstName: "Atharva", lastName: "Sugandhi" });
});

// Request Handler to store User Info
app.post("/user", (req, res) => {
    res.send("Updated User Info!");
});

// Request Handler for /test
app.use("/test", (req, res) => {
    res.send("Testing 1, 2, 3...");
});

// Server Listening on Port
app.listen(7777, () => {
    console.log("Listening on PORT 7777...");
});
