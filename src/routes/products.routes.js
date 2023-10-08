import { Router } from "express";
import { createProduct, getProductById, getProducts } from "../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.post('/anunciar', createProduct);
productsRouter.get('/home', getProducts);
productsRouter.get('/produto/:id', getProductById);

export default productsRouter;