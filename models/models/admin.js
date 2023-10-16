
import mongoose from 'mongoose';

const adminOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true,  },         //unique: true, index: true

  sessionId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productQuantity: { type: Number, default: 1 },
  orderDate: { type: Date, default: Date.now },
  userAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    mobileNumber: String,
    email: String,
  },
  ProductTitle: { type: String, required: true },
  paymentMethod: String,
  transactionId: String,
  Invoice_url: String,
  Invoice_pdf: String,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  FinalPaymentStatus: { type: String, required: true} ,
  shipping_cost: { type: Number, default: 0 },
  amount_subtotal: { type: Number, default: 0 },
amount_total: { type: Number, default: 0 },
});

const AdminOrder = mongoose.models.AdminOrder || mongoose.model('AdminOrder', adminOrderSchema);

export default AdminOrder;

 
