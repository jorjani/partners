const express = require("express");
const app = express();
var mongoose = require('mongoose');
const cors = require("cors");
const userRouter = require("./routes/users");
const projectRouter = require("./routes/projects");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/users", userRouter)
app.use("/projects", projectRouter)

app.listen(port, () => {
    // perform a database connection when server starts
    console.log("Server is running on Port: " + port);
    const uri = process.env.ATLAS_URI
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection
    connection.once('open', () => {
        console.log("MongoDB connection established successfully.")
    })
});

module.exports = app;