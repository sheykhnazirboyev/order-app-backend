import express from "express";
import { ProductModel } from "../models/product.model.js";
import { validateProduct } from "../utils/validateProduct.js";
import { validateObjectId } from "../utils/validateObjectId.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(404).send("Invalid Object Id");

  const product = await ProductModel.findById(req.params.id);
  if (!product) return res.status(404).send("Product not found");

  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    if (!validateObjectId(id)) return res.status(404).send("Invalid Object Id");

    const product = await ProductModel.findById(id);
    if (!product) return res.status(404).send("Product not found");

    const newProduct = await ProductModel.findByIdAndUpdate(id, req.body);

    res.send(newProduct);
  } catch (err) {
    console.log("Error on creating product", err);
    next();
  }
});

router.post("/", [auth], async (req, res, next) => {
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    console.log("Error on creating product", err);
    next();
  }
});

router.delete("/:id", [auth], async (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(404).send("Invalid Object Id");

  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).send("Product not found");

  res.send(product._id);
});

export const productRouter = router;
