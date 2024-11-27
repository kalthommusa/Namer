import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensures no duplicate emails
      lowercase: true, // Converts email to lowercase
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Email validation
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d+$/, "Phone number should contain only digits"], // Ensures only digits
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, "ZIP code is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;