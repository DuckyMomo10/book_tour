import jwt from "jsonwebtoken";

// Hàm verifyToken để xác thực token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "You are not authorized" });
  }

  // Nếu token tồn tại thì tiến hành xác thực token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

// Hàm verifyUser để xác thực người dùng
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({ success: false, message: "You are not authenticated" });
    }
  });
};

// Hàm verifyAdmin để xác thực quyền admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({ success: false, message: "You are not authorized" });
    }
  });
};
