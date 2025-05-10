import express from "express";
import cors from "cors";
import inventorySchema from "./inventorySchema.js";
import Inventory from "./inventorySchema.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27019/inventoryApp", {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
}

app.post("/setItem", async (req, res) => {
  // 👈 Add `async`
  console.log("Request body:", req.body); // Log the request body
  try {
    const { name } = req.body;

    // Check if item exists (await the query)
    const existingItem = await inventorySchema.findOne({ name }); // ✅ Corrected
    if (existingItem) {
      return res
        .status(400)
        .json({ message: "Item already exists,Try with another name" });
    }

    // Create and save new item
    const newItem = new inventorySchema(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getItems", (req, res) => {
  inventorySchema
    .find()
    .then((items) => res.status(200).json(items))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/deleteItem/:id", (req, res) => {
  const itemId = req.params.id;
  Inventory
    .findByIdAndDelete(itemId)
    .then(() => res.status(200).json({ message: "Item deleted successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/updateQuantity/:id", (req, res) => {
  const itemId = req.params.id;
  const { quantity } = req.body;

  inventorySchema
    .findByIdAndUpdate(itemId, { $inc: { quantity: quantity } }, { new: true })
    .then((updatedItem) => {
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(updatedItem);
    });
});

app.put("/updateMinAmount/:id", (req, res) => {
  const itemId = req.params.id;
  const { minimumAmount } = req.body;
  console.log("Minimum Amount:", minimumAmount); // Log the minimum amount

  inventorySchema
    .findByIdAndUpdate(
      itemId,
      { $inc: { minimumAmount: minimumAmount } },
      { new: true }
    )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(updatedItem);
    });
});

app.get("/", (req, res) => {
  res.send("I am listening");
  console.log("new item" === "new item");
});

connectDB().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});
