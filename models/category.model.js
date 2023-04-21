const { Schema, model } = require("mongoose");


const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  description: {
    type: String,
    required: true
  },
  topic: [
    {
      type: String,
      required: true
    },  
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryModel = model("Category", CategorySchema);

module.exports = CategoryModel;