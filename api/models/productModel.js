import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;