import inventoryModel from "../Models/inventorySchema.js";

export const setItems = async (req) => {
  try {
    const { name } = req.body;

    // Check if item exists (await the query)
    const existingItem = await inventoryModel.findOne({ name });
    if (existingItem) throw new Error("Item already exists");

    // Create and save new item
    const newItem = new inventoryModel(req.body);
    await newItem.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getItems = async () => {
  try {
    const items = await inventoryModel.find();
    return items;
  } catch (err) {
    throw new Error(err.message); // Propagates as a rejected Promise
  }
};

export const deleteItems = async (itemId) => {
  // const itemId = req.params.id;
  try {
    await inventoryModel.findByIdAndDelete(itemId);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateQuantity = (req) => {
  const itemId = req.params.id;
  const { quantity } = req.body;

  inventoryModel
    .findByIdAndUpdate(itemId, { $inc: { quantity: quantity } }, { new: true })
    .then((updatedItem) => {
      if (!updatedItem) {
        throw new Error("Item not found");
      }
      return updatedItem;
    });
};

export const updateMinimumAmount = (req) => {
  const itemId = req.params.id;
  const { minimumAmount } = req.body;
  console.log("Minimum Amount:", minimumAmount); // Log the minimum amount

  inventoryModel
    .findByIdAndUpdate(
      itemId,
      { $inc: { minimumAmount: minimumAmount } },
      { new: true }
    )
    .then((updatedItem) => {
      if (!updatedItem) {
        throw new Error("Item not found");
      }
      return updatedItem;
    });
};
