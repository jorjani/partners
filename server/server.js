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
    let res = ""
    let parse = req.path.split("/");
    let counter = 0;
    for(let i=0; i<parse.length; i++){
        if(mongoose.isValidObjectId(parse[i])){
            if(counter == 0){
                res = res + "[course_id]/"
            }else if(counter == 1){
                res = res + "[project_id]/"
            }
            counter = counter + 1
        }else{
            res = res + parse[i] + "/"
        }
    }
    res = res.substring(0, res.length - 1)
    console.log(res)
    return res
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