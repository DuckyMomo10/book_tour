import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auths.js";
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true, // Bạn có thể chỉ định các miền cụ thể ở đây
  credentials: true,
};

// Kết nối đến MongoDB
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
    process.exit(1); // Dừng server nếu không kết nối được
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Route mặc định tránh lỗi "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Server đang chạy!");
});

// Routes API
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use('/api/v1/booking', bookingRoute);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Kết nối MongoDB trước khi khởi chạy server
connect().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server đang lắng nghe trên cổng ${port}`);
  });
});
