import express from "express";
import { UserModel } from "../models/users.js";
import { validateUser } from "../utils/validateUser.js";
import _ from "lodash";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await UserModel.find().select("name");
    res.json(users);
})

router.post("/register", async (req, res) => {
    const {error} = validateUser(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    const email = await UserModel.findOne({ email: req.body.email });
    if(email)
        return res.status(400).send("Existing email address");

    const user = new UserModel(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(201).send(_.pick(user, ["name", "email"]));
});


export const usersRouter = router