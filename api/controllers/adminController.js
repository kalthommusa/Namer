import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js'; 
import User from '../models/userModel.js'
import Product from '../models/productModel.js';

// POST: Admin Signup
export const signupAdmin = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({ username, email, password: hashedPassword });
    res.status(201).json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};

// Admin Login
export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check admin existence
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    // Send response with admin details and token
    res.status(200).json({ 
      success: true, 
      token,
      admin: {
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get All User Inquiries
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await User.find({}).sort("-createdAt");
    if (!inquiries) {
      return res.status(404).json({ success: false, message: 'There is no inquiries' });
    }
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    next(error);
  }
};

// Create Product
export const createProduct = async (req, res, next) => {
  const { name, description, image } = req.body;
  try {
    const product = await Product.create({ name, description, image });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Update Product
export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, {...req.body}, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Delete Product
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};