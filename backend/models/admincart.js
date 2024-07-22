import mongoose from "mongoose";

const RegisterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },
});

export const Register = mongoose.model("Rentcars", RegisterSchema);
