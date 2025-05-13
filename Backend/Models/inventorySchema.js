import mongoose from "mongoose";

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

const inventoryModel = mongoose.model("Inventory", inventorySchema);
export default inventoryModel;
