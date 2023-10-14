import mongoose from 'mongoose';

const orderPaymentInfoSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
  sessionId: { type: String, required: true },
  paymentMethod: String,

  Invoice_url: { type: String, required: true },
  Invoice_pdf: { type: String, required: true },
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

const orderPaymentInfo  =mongoose.models.orderPaymentInfo||  mongoose.model("orderPaymentInfo", orderPaymentInfoSchema);
 
export default orderPaymentInfo ;
 