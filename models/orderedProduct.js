// orderedProductDetail.js

import mongoose from "mongoose";

const orderedProduct = new mongoose.Schema({
  products: [
    {
      productIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Assuming there is a "Product" model to reference
        required: true,
      },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      amount_subtotal: { type: Number, required: true },
      amount_tax: { type: Number, required: true },
      amount_total: { type: Number, required: true },
      amount_discount: { type: Number, required: true },
      images: [String],
    }
  ],
});

const orderedProductDetail = mongoose.models.orderedProductDetail || mongoose.model("orderedProductDetail", orderedProduct);

export default orderedProductDetail;
  
 