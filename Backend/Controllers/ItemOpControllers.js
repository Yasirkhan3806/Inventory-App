import {setItems,getItems,deleteItems,updateQuantity,updateMinimumAmount} from "../Services/ItemsOperation.js";

export const setItemsController = async (req, res) => {
  try {
    await setItems(req);
    res.status(201).json({ message: "Item created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getItemsController = async (req, res) => {
  try {
    const items = await getItems();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItemsController = async (req, res) => {
  try {
    await deleteItems(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateQuantityController = async (req, res) => {
  try {
    const items = await updateQuantity(req);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMinimumAmountController = async (req, res) => {
  try {
    const items = await updateMinimumAmount(req);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
