import * as models from '../models';
import mysql from 'mysql2';
import config from 'config';

const connection = mysql.createConnection({
  user: 'root',
  password: '',
});

export const db = connection.promise();

db.connect()
  .then(() =>
    console.log(`connected to database ${config.get('database.name')}`)
  )
  .then(() =>
    db.query(`CREATE DATABASE IF NOT EXISTS ${config.get('database.name')}`)
  )
  .then(() => db.query(`USE ${config.get('database.name')}`))
  .then(() => {
    models.Portfolios.sync({ force: true });
    models.Tickers.sync({ force: true });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
