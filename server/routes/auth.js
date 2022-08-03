// Auth Routes

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var { studentModel, partnerModel, managementModel } = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { ReturnDocument } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;

require("dotenv").config();

// POST

router.route("/register").post(jsonParser, async (req, res) => {
    const { firstName, lastName, userType, email, password, passwordCheck, student_id, github_id, iterations, affiliations } = req.body;
    try {
        if (!firstName || !lastName || !userType || !email || !password || !passwordCheck)
            return res.status(400).json({ msg: "Not all basic fields have been entered." });
        if (password.length < 8)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 8 characters long." });
        if (password !== passwordCheck)
            return res.status(400).json({ msg: "The two passwords do not match." });

        var existingUser = null;
        if (userType === "student") {
            var existingUser = await studentModel.findOne({ email: email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ msg: "An account with this email already exists." });
            }
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(password, salt);
            const newUser = new studentModel({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: passHash,
                student_id: student_id,
                github_id: github_id,
                iterations: iterations,
            });
            newUser.save()
                .then(() => {
                    res.status(200).send("Student successfully created!");
                })
                .catch((err) => {
                    res.status(400).json("Error: " + err);
                });
        } else if (userType === "partner") {
            var existingUser = await partnerModel.findOne({ email: email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ msg: "An account with this email already exists." });
            }
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(password, salt);
            const newUser = new partnerModel({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: passHash,
                iterations: iterations,
                affiliations: affiliations
            });
            newUser.save()
                .then(() => {
                    res.status(200).send("Partner successfully created!");
                })
                .catch((err) => {
                    res.status(400).json("Error: " + err);
                });
        } else if (userType === "management") {
            var existingUser = await managementModel.findOne({ email: email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ msg: "An account with this email already exists." });
            }
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(password, salt);
            const newUser = new managementModel({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: passHash
            });
            newUser.save()
                .then(() => {
                    res.status(200).send("Management successfully created!");
                })
                .catch((err) => {
                    res.status(400).json("Error: " + err);
                });
        }
        return;
    }
    catch (err) {
        res.status(400).json("Error: " + err);
    }
}
);

router.route("/login").post(jsonParser, async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        if (!email || !password || !userType) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        if (userType === "student") {
            var user = await studentModel.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ msg: "No account with this email exists." });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials." });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1hr",
            });
            res.json({
                token: token,
                user: user,
            });
        } else if (userType === "partner") {
            var user = await partnerModel.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ msg: "No account with this email exists." });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials." });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1hr",
            });
            res.json({
                token: token,
                user: user,
            });
        } else if (userType === "management") {
            var user = await managementModel.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ msg: "No account with this email exists." });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials." });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1hr",
            });
            res.json({
                token: token,
                user: user,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/token", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);
        var student = await studentModel.findOne({ _id: ObjectId(verified.id) });
        var partner = await partnerModel.findOne({ _id: ObjectId(verified.id) });
        var management = await managementModel.findOne({ _id: ObjectId(verified.id) });
        if (!student && !partner && !management) return res.json(false);
        if(student) {
            return res.json({
                id: verified.id,
                type: "student"
            });
        } else if (partner) {
            return res.json({
                id: verified.id,
                type: "partner"
            });
        } else if (management) {
            return res.json({
                id: verified.id,
                type: "management"
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;