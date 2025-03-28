import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\+?[0-9]{7,15}/.test(v);
        },
        message: (props) => `${props.value} không phải là số điện thoại hợp lệ!`,
      },
    },
    bookAt: {
      type: Date,
      default: () => {
        // Lấy thời gian hiện tại ở múi giờ UTC
        const utcDate = new Date();
        // Chuyển đổi sang giờ Việt Nam (GMT+7)
        return new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
