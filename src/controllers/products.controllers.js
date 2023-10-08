import db from '../database/db.js';
import { productSchema } from '../schemas/products.schemas.js';

export async function createProduct(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send("Você precisa estar logado para realizar esta ação.");
    }

    const {name, description, picture, price} = req.body;
    const product = {name, description, picture, price};
    const validation = productSchema.validate(product, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        await db.query(`INSERT INTO product(name, description, picture, price) VALUES($1, $2, $3, $4);`, [name, description, picture, price]);
        res.status(201).send("Anúncio criado com sucesso!");
    } catch (err) {
        return res.status(500).send(err);
    }
}

export async function getProducts(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send("Você precisa estar logado para realizar esta ação.");
    }

    try {

    } catch (err) {
        return res.status(500).send(err);
    }
}