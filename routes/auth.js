import express from "express";
import { validateAuth } from "../utils/validateAuth.js";
import { UserModel } from "../models/users.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { error } = validateAuth(req.body);
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
    
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).send("Invalid username or password");
        }
    
        const isValidaPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isValidaPassword) {
          return res.status(400).send("Invalida username or password");
        }
    
        const token = user.generateAuthToken();
        res.header("Authorization", `Bearer ${token}`).send(`Bearer ${token}`);
      } catch (err) {
        console.error("Error while login", err.message);
        next(err);
      }
});

export const authRouter = router;
