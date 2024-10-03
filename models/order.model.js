import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: +new Date() + 7*24*60*60*1000,
    required: true
  }, 
  status: {
    type: String,
    enum: ['WAITING_PAYMENT', 'SENT', 'DELIVERED'],
    default: 'WAITING_PAYMENT'
  },
  product_name: {
    type: String,
    required: true
  },
  product_count: {
    type: Number,
    required: true
  },
  client_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

export const OrderModel = mongoose.model("Order", OrderSchema);

