import express from "express";
import { CategoryModel } from "../models/category.model.js";
import { validateCategory } from "../utils/validateCategory.js";
import { auth } from "../middleware/auth.js";
import { validateObjectId } from "../utils/validateObjectId.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await CategoryModel.find();
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(404).send("Invalid Object Id");

    const category = await CategoryModel.findById(req.params.id);
    if (!category) return res.status(404).send("Category not found");

    res.send(category);
  } catch (err) {
    console.log("Error on getting category", err);
    next();
  }
});

router.put("/:id", [auth], async (req, res) => {
  const { id } = req.params;
  try {
    if (!validateObjectId(id)) return res.status(404).send("Invalid Object Id");

    const category = await CategoryModel.findById(id);
    if (!category) return res.status(404).send("Category not found");

    const { error } = validateCategory(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const newCategory = await CategoryModel.findByIdAndUpdate(id, req.body);

    res.send(newCategory);
  } catch (err) {
    console.log("Error on getting category", err);
    next();
  }
});

router.post("/", [auth], async (req, res, next) => {
  const { error } = validateCategory(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const category = new CategoryModel(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    console.log("Error on creating category", err);
    next();
  }
});

router.delete("/:id", [auth],  async (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(404).send("Invalid Object Id");

  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).send("Category not found");

  res.send(category._id);
});

export const categoryRouter = router;
