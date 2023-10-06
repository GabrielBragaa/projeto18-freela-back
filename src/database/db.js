import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const configDatabase = {
    connectionString: 'postgres://postgres:123@localhost:5432/mecansei'
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

const db = new Pool(configDatabase);

export default db;