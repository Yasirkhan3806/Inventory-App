import express from 'express';
const ItemRouter = express.Router();
import {setItemsController,getItemsController,deleteItemsController,updateQuantityController,updateMinimumAmountController} from '../Controllers/ItemOpControllers.js';

// Route to get all items

ItemRouter.get('/getItems', getItemsController);
ItemRouter.post('/setItems', setItemsController);
ItemRouter.delete('/deleteItems/:id', deleteItemsController);
ItemRouter.put('/updateQuantity/:id', updateQuantityController);
ItemRouter.put('/updateMinAmount/:id', updateMinimumAmountController);

export default ItemRouter;
