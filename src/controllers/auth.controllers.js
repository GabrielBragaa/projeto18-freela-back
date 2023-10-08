import db from '../database/db.js';
import { signInSchema, signUpSchema } from '../schemas/auth.schemas.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const {email, password, name, cpf, telephone, confirmPassword} = req.body;
    const user = {email, password, name, cpf, telephone};
    const validation = signUpSchema.validate(user, {abortEarly: false});
    
    if (password !== confirmPassword) {
        return res.status(422).send("As senhas não coincidem.");
    }

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        const userExists = await db.query(`SELECT * FROM "user" WHERE email = $1;`, [email]);
        if (userExists.rowCount !== 0) {
            return res.status(400).send("Este e-mail já foi cadastrado.");
        }

        await db.query(`INSERT INTO "user"(email, password, name, cpf, telephone) VALUES($1, $2, $3, $4, $5);`, [email, encryptedPassword, name, cpf, telephone]);

        res.status(201).send("Usuário criado com sucesso!");

    } catch (err) {
        return res.status(500).send(err);
    }
}

export async function signIn(req, res) {
    const {email, password} = req.body;
    const user = {email, password};

    const validation = signInSchema.validate(user, {abortEarly: false});

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const userExists = await db.query(`SELECT * FROM "user" WHERE email = $1;`, [email]);

        if (userExists.rowCount === 0) {
            return res.status(422).send("O e-mail digitado não está cadastrado em nosso banco de dados. Verifique e tente novamente.");
        }

        const dbPassword = userExists.rows[0].password;
        const userId = userExists.rows[0].id;

        if (bcrypt.compareSync(password, dbPassword) === false) {
            return res.status(422).send("A senha digitada está incorreta.");
        }

        const token = uuid();

        await db.query(`INSERT INTO "sessions"(token, "userId") VALUES($1, $2);`, [token, userId]);

        res.status(200).send(token);

    } catch (err) {
        return res.status(500).send(err);
    }
}