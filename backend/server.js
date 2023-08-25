import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
const port = process.env.PORT || 8000;
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

connectDb();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "PUT", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));
