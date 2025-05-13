import express from "express";
import cors from "cors";
import inventorySchema from "./inventorySchema.js";
import Inventory from "./inventorySchema.js";
import ItemRouter from "./Routes/ItemRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/Items", ItemRouter);

export default app;