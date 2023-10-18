
import mongoose from "mongoose";
// import UserAddress from "./UserAddress";
// import User from "./User";
// import orderedProductDetail from "./orderedProduct";
// import orderPaymentInfo from "./paymentInfo";
 

const adminOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderedProductDetail:  
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderedProductDetail",
      required: true,
    },
 
  userAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAddress",
    required: true,
  },
  orderPaymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderPaymentInfo",
    required: true,
  },
  orderDate: { type: Date, default: () => new Date(created * 1000) },
  productStatus: {
    type: String,
    enum: ["Pending", "Packed", "Dispatched", "Reached", , "Delivered"],
    default: "Pending",
  },
});

const AdminOrder =mongoose.models.AdminOrder || mongoose.model("AdminOrder", adminOrderSchema);

 
export default  AdminOrder;