import * as models from '../models';
import mysql from 'mysql2';
import { database } from '../../config/database';

const connection = mysql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
});

const db = connection.promise();
export async function dbConnection() {
  try {
    await db.connect();
    console.log(`connected to database ${database.name}`);
    await db.query(`CREATE DATABASE IF NOT EXISTS ${database.name}`);
    await db.query(`USE ${database.name}`);
    await models.Portfolios.sync();
    await models.Tickers.sync();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
// db.connect()
//   .then(() => console.log(`connected to database ${database.name}`))
//   .then(() => db.query(`CREATE DATABASE IF NOT EXISTS ${database.name}`))
//   .then(() => db.query(`USE ${database.name}`))
//   .then(() => {
//     models.Portfolios.sync();
//     models.Tickers.sync();
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });
