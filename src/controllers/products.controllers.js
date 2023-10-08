import db from '../database/db.js';
import { productSchema } from '../schemas/products.schemas.js';

export async function createProduct(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send("Você precisa estar logado para realizar esta ação.");
    }

    const {name, description, picture, price, category} = req.body;
    const product = {name, description, picture, price, category};
    const validation = productSchema.validate(product, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const alreadyPosted = await db.query('SELECT * FROM product WHERE name = $1 AND description = $2 AND picture = $3 AND price = $4;', [name, description, picture, price]);
        if (alreadyPosted.rowCount !== 0) {
            return res.status(403).send("Já existe um anúncio exatamente igual a esse!");
        } else {
            await db.query(`INSERT INTO product(name, description, picture, price) VALUES($1, $2, $3, $4);`, [name, description, picture, price]);
        }
            const productId = await db.query('SELECT id FROM product WHERE name = $1 AND description = $2 AND picture = $3 AND price = $4;', [name, description, picture, price]);
            const productCategory = await db.query(`SELECT id FROM category WHERE name = $1;`, [category]);
            const userId = await db.query(`SELECT "userId" FROM sessions WHERE token = $1;`, [token]);
            await db.query(`INSERT INTO product_category("productId", "categoryId") VALUES($1, $2);`, [productId.rows[0].id, productCategory.rows[0].id]);
            await db.query(`INSERT INTO user_product("userId", "productId") VALUES($1, $2);`, [userId.rows[0].userId, productId.rows[0].id]);
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
        const products = await db.query(`SELECT * FROM product;`);
        res.status(200).send(products.rows);
    } catch (err) {
        return res.status(500).send(err);
    }
}