const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'  },
 
 
 // // orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
 reviewedProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'orderedProductDetail' },  //, required: true
});
 
 
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

module.exports = Review;
