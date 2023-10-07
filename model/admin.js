
import mongoose from 'mongoose';

const adminOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  userAddress: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: String,
    mobileNumber: String,
    email: String,
   },
  orderStatus: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  },
  paymentMethod: String,
  transactionId: String,
  shippingMethod: String,
  trackingNumber: String,
  estimatedDeliveryDate: Date,
  discounts: {
    discountCode: String,
    amount: Number,
  },
  orderNotes: String,
  orderItems: [orderItemSchema],
  // Add any other additional fields as needed for the admin view
});

const AdminOrder = mongoose.models.AdminOrder || mongoose.model('AdminOrder', adminOrderSchema);

export default AdminOrder;
