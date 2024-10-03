import express from "express";
import { OrderModel } from "../models/order.model.js";
import { validateObjectId } from "../utils/validateObjectId.js";
import { auth } from "../middleware/auth.js";
import { validateOrder } from "../utils/validateOrder.js";
// import orders from "../order.json";
import orders from "../data/order.json" assert { type: "json" };


const router = express.Router();

router.get("/", [auth], async (req, res) => {
  // const orders = await OrderModel.find();
  res.send(orders);
});

router.get("/:id", [auth],async (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(404).send("Invalid Object Id");

  const order = await OrderModel.findById(req.params.id);
  if (!order) return res.status(404).send("Order not found");

  res.send(order);
});

router.put("/:id",[auth], async (req, res) => {
  const { id } = req.params;
  const { error } = validateOrder(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    if (!validateObjectId(id)) return res.status(404).send("Invalid Object Id");

    const product = await OrderModel.findById(id);
    if (!product) return res.status(404).send("Order not found");

    const newOrder = await OrderModel.findByIdAndUpdate(id, req.body);

    res.send(newOrder);
  } catch (err) {
    console.log("Error on creating order", err);
    next();
  }
});

router.post("/", [auth], async (req, res, next) => {
  const { error } = validateOrder(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const order = new OrderModel(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    console.log("Error on creating order", err);
    next();
  }
});

router.delete("/:id", [auth], async (req, res) => {
  if (!validateObjectId(req.params.id))
    return res.status(404).send("Invalid Object Id");

  const order = await OrderModel.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).send("Order not found");

  res.send(order._id);
});

export const orderRouter = router;
