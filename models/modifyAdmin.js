// adminOrder.js

import mongoose from "mongoose";
import ProductTitleQuantity from "./productTitleQuantity";
import UserAddress from "./UserAddress";

const adminOrderTestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ProductTitleQuantity: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ProductTitleQuantity" },
  ],
  userAddress: { type: mongoose.Schema.Types.ObjectId, ref: "UserAddress" },
  orderPaymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderPaymentInfo",
  },
 orderDate: { type: Date, default: () => new Date(created * 1000) }

});

const AdminOrderTest = mongoose.models.AdminOrderTest || mongoose.model("AdminOrderTest", adminOrderTestSchema);
 
export default AdminOrderTest;
