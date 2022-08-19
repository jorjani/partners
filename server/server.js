const express = require("express");
const app = express();
var mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
const userRouter = require("./routes/users");
const projectRouter = require("./routes/projects");
const organizationRouter = require("./routes/organizations");
const iterationRouter = require("./routes/iterations");
const authRouter = require("./routes/auth");
const publicPath = path.join(__dirname, '../client/out');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
// const handle = app.getRequestHandler();

const formatRequest = (req) => {
    return req.path.replace(/(?<=\/)[0-9a-f]{24,}/g, '[course_id]');
}

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter)
app.use("/api/projects", projectRouter)
app.use("/api/organizations", organizationRouter)
app.use("/api/iterations", iterationRouter)
app.use("/api/auth", authRouter)

app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, formatRequest(req)+'.html'));
 });

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