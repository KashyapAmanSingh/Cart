import mongoose from 'mongoose';

const orderPaymentInfo = new mongoose.Schema({
  sessionId: { type: String, required: true },
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
  orderDate: { type: Date, default: Date.now },
});

const orderPaymentInfoTest =mongoose.models.orderPaymentInfo||  mongoose.model("orderPaymentInfo", orderPaymentInfo);
 
export default orderPaymentInfoTest;
