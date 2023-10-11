import mongoose from "mongoose";

const adminOrderSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  ],
  
  images: [String],

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  userAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
  },
  paymentMethod: String,
  transactionId: String,
  Invoice_url: String,
  Invoice_pdf: String,
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  FinalPaymentStatus: { type: String, required: true },
  shipping_cost: { type: Number, default: 0 },
  amount_subtotal: { type: Number, default: 0 },
  amount_total: { type: Number, default: 0 },
  amount_discount: { type: Number, default: 0 },
});

const AdminOrder =
  mongoose.models.AdminOrder || mongoose.model("AdminOrder", adminOrderSchema);

export default AdminOrder;
