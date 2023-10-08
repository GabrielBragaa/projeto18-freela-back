import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts } from "../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.post('/anunciar', createProduct);
productsRouter.get('/home', getProducts);
productsRouter.get('/produto/:id', getProductById);
productsRouter.delete('/excluir/:id', deleteProduct);

export default productsRouter;