import { setPersonController,getPersonController,deletePersonController } from "../Controllers/Client-person-controller.js";
import express from 'express';
const PersonRouter = express.Router();


// Route to get all items
PersonRouter.post('/setPerson', setPersonController);
PersonRouter.get('/getPerson', getPersonController);
PersonRouter.delete('/deletePerson/:id', deletePersonController);


export default PersonRouter;