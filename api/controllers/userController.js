import User from '../models/userModel.js';

// POST: Create a new user inquiry
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, companyName, city, zipCode, address, message } = req.body;

    const user = await User.create({
      name,
      email,
      phone,
      companyName,
      city,
      zipCode,
      address,
      message,
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create inquiry" });
  }
}; 