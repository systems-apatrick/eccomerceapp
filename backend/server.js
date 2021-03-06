import express from "express";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();

connectDB();
connectCloudinary();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors()); // Use this after the variable declaration

// configuramos express
// app.use(express.urlencoded());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  console.log("construyendo frontend");
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/api/info", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`
      .yellow.bold
  )
);
