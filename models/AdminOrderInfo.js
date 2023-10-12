// adminOrder.js

import mongoose from "mongoose";
import ProductTitleQuantity from "./orderedProduct";
import UserAddress from "./UserAddress";

const adminOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ProductTitleQuantity: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ProductTitleQuantity", required: true  },
  ],
  userAddress: { type: mongoose.Schema.Types.ObjectId, ref: "UserAddress", required: true  },
  orderPaymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderPaymentInfo", required: true 
  },
 orderDate: { type: Date, default: () => new Date(created * 1000) }

});

const AdminOrder = mongoose.models.AdminOrder || mongoose.model("AdminOrder", adminOrderSchema);
 
export default AdminOrder;
  