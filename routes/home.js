import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ hello: "World" });
});

export const homeRouter = router;
