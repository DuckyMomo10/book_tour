import express from "express";
import {
  deleteUser,
  getAllUser,
  getDetailUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verityToken.js";

// Update user
router.put("/:id", verifyUser, updateUser);

// Delete user
router.delete("/:id", verifyUser, deleteUser);

// Get detail user
router.get("/:id", verifyUser, getDetailUser);

// Get all users
router.get("/", verifyAdmin, getAllUser);

export default router;
