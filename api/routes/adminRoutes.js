import express from 'express';

import { signupAdmin, loginAdmin, getInquiries, createProduct, updateProduct, deleteProduct } from '../controllers/adminController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);
router.get("/inquiries", protect, getInquiries);
router.post("/product", protect, createProduct);
router.patch("/product/:id", protect, updateProduct);
router.delete("/product/:id", protect, deleteProduct);

export default router;