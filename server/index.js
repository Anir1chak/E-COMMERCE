import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import itemRoutes from "./routes/items.js";
import searchRoutes from "./routes/search.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/server/auth", authRoutes);
app.use("/server/users", userRoutes);
app.use("/server/items", itemRoutes);
app.use("/server/search",searchRoutes);

app.listen(8800, () => {
    console.log("Connected!");
  });

