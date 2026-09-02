const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    sku: {
      type: String,
      unique: true,
    },
    categoryId: {
        //category table _id -->
      type: mongoose.Schema.ObjectId,
      ref: "categories",
    },
    stockStatus:{
        type:String,
        enum:["available","low","out of stock"]
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("products", productModel);
