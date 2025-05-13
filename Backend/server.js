import app from "./App.js";
import mongoose from "mongoose";



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



// app.get("/", (req, res) => {
//   res.send("I am listening");
//   console.log("new item" === "new item");
// });

connectDB().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});
