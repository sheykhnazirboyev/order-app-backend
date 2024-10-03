import express from "express";
import { UserModel } from "../models/users.js";
import bcrypt from "bcrypt";
import { validateRegister } from "../utils/validateRegister.js";
import _ from "lodash";
import { validateUser } from "../utils/validateUser.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const {error} = validateUser(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
  
    const email = await UserModel.findOne({ email: req.body.email });
    if(email)
        return res.status(400).send("Email adready in use");
  
    const user = new UserModel(_.pick(req.body, ["name", "email", "password", "role"]));
  
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  
    await user.save();
  
    res.status(201).send(_.pick(user, ["name", "email", "role"]));
  });
  

export const userRouter = router;
