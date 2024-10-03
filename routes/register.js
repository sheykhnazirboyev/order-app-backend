import express from "express";
import { UserModel } from "../models/users.js";
import bcrypt from "bcrypt";
import { validateRegister } from "../utils/validateRegister.js";
import _ from "lodash";

const router = express.Router();

router.post("/", async (req, res) => {
    const {error} = validateRegister(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
  
    const username = await UserModel.findOne({ username: req.body.username });
    if(username)
        return res.status(400).send("Username adready in use");
  
    const user = new UserModel(_.pick(req.body, ["username", "password", "isAdmin"]));
  
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  
    await user.save();
  
    res.status(201).send(_.pick(user, ["username", "isAdmin"]));
  });
  

export const registerRouter = router;
