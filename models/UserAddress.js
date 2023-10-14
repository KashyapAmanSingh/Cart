// userAddress.js

import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
});

const UserAddress = mongoose.models.UserAddress  ||   mongoose.model("UserAddress", userAddressSchema);
 
export default UserAddress;
