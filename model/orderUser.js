
import mongoose from 'mongoose';

const customerOrderSchema = new mongoose.Schema({
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
    // Add other address details as needed
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

});

const CustomerOrder = mongoose.models.CustomerOrder || mongoose.model('CustomerOrder', customerOrderSchema);

export default CustomerOrder;
