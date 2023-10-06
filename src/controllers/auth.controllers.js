import db from '../database/db.js';
import { signUpSchema } from '../schemas/auth.schemas.js';

export async function signUp(req, res) {
    const {email, password, name, cpf, telephone} = req.body;
    const user = {email, password, name, cpf, telephone};
    const validation = signUpSchema.validate(user, {abortEarly: false});
    
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const userExists = await db.query(`SELECT * FROM user WHERE email = $1;`, [email]);
        if (userExists.rowCount !== 0) {
            return res.status(400).send("Este e-mail já foi cadastrado.");
        }

        await db.query(`INSER INTO user(email, password, name, cpf, telephone) VALUES($1, $2, $3, $4, $5);`, [email, password, name, cpf, telephone]);

        res.status(201).send("Usuário criado com sucesso!");

    } catch (err) {
        return res.status(500).send(err);
    }
}