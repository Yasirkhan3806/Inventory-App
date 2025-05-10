const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    id: {
        type:String,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
  name: {
    type: String,
    required: true,
  },
  productImageLink: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  minimumAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
