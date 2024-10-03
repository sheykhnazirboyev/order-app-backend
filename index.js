import express from "express";
import cors from "cors";
import connectDB from "./startup/db.js";
import { categoryRouter } from "./routes/categories.js";
import { productRouter } from "./routes/products.js";
import { usersRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import checkConfig from "./startup/config.js";
import { registerRouter } from "./routes/register.js";
import { userRouter } from "./routes/user.js";
import { orderRouter } from "./routes/order.js";

const app = express();

connectDB();
checkConfig();


app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
// app.use("/api/register", registerRouter)
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter)

const port = process.env.PORT || 9001;

app.listen(port, () => {
    console.log("Server started on ", port)
});