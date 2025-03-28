import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Hàm đăng ký người dùng
export const register = async (req, res) => {
  try {
    const { username, email, password, photo, role } = req.body;

    // Kiểm tra vai trò (nếu có), chỉ cho phép 'user' hoặc 'admin'
    if (role && !['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    // Xử lý mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Nếu role không được chỉ định, mặc định là 'user'
    const newUser = new User({
      username,
      email,
      password: hash,
      photo,
      role: role || 'user', // Vai trò mặc định là 'user'
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Please try again" });
  }
};

// Hàm đăng nhập người dùng
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    // Nếu người dùng không tồn tại
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Kiểm tra mật khẩu
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Nếu mật khẩu không chính xác
    if (!checkCorrectPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const { password, ...rest } = user._doc;

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // Set token trong cookie và gửi phản hồi
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Set thời gian hết hạn
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logged in",
        token,
        data: { ...rest },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to login. Please try again" });
  }
};
