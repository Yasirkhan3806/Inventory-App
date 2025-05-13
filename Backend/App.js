import express from "express";
import cors from "cors";
import PersonRouter from "./Routes/Client-Person-route.js";
import ItemRouter from "./Routes/ItemRoutes.js";
import historyRouter from "./Routes/History.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/Items", ItemRouter);
app.use("/Person", PersonRouter);
app.use("/History", historyRouter);

export default app;