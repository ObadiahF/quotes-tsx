import mysql from 'mysql'
import dotenv from 'dotenv';

dotenv.config();

const timeout = 1000;
const connection = mysql.createConnection({
    charset: 'utf8mb4',
    connectTimeout: timeout,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbName,
    host: process.env.dbHost,
    port: 25911
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as id', connection.threadId);
});

connection.on('error', (err) => {
    console.error('MySQL connection error:', err);
    connection.end();
});

connection.on('end', () => {
    console.log('MySQL connection closed.');
});
