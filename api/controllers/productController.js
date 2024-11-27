import Product from '../models/productModel.js';

// GET: Fetch all products
export const getProducts = async (req, res) => {  
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error });
  }
};