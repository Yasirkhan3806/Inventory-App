import { addHistoryController } from "../Controllers/History.js";
import express from "express";
const historyRouter = express.Router();


historyRouter.post("/addHistory", addHistoryController);

export default historyRouter;