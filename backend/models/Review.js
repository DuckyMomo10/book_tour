import mongoose from "mongoose";
import moment from 'moment-timezone';

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Cập nhật trường updatedAt mỗi khi tài liệu được lưu
reviewSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Chuyển đổi giờ UTC sang giờ Việt Nam khi đọc dữ liệu
reviewSchema.methods.getVietnamTime = function (field) {
  return moment(this[field]).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
};

export default mongoose.model("Review", reviewSchema);
