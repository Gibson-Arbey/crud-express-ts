import { Sequelize } from "sequelize";

import dotenv from 'dotenv';
dotenv.config();

const database = process.env.DATABASE ?? 'database';
const user = process.env.USER_DB ?? 'user';
const password = process.env.PASS_DB ?? 'password';
const host = process.env.HOST_DB ?? 'localhost';


const db = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    logging: console.log
});

export default db;
