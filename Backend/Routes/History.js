import { addHistoryController,getHistoryController } from "../Controllers/History.js";
import express from "express";
const historyRouter = express.Router();


historyRouter.post("/addHistory", addHistoryController);
historyRouter.get("/getHistory", getHistoryController);

export default historyRouter;