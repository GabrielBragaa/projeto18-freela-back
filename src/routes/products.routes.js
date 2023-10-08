import { Router } from "express";
import { createProduct, getProducts } from "../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.post('/create', createProduct);
productsRouter.get('/home', getProducts);

export default productsRouter;