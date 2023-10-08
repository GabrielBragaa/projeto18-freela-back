import { Router } from "express";
import { createProduct, deleteProduct, getMyProducts, getProductById, getProducts } from "../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.post('/anunciar', createProduct);
productsRouter.get('/home', getProducts);
productsRouter.get('/produto/:id', getProductById);
productsRouter.delete('/excluir/:id', deleteProduct);
productsRouter.get('/meus-produtos', getMyProducts);

export default productsRouter;