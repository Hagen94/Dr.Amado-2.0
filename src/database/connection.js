
// Importar mysql2
import mysql from 'mysql2';
// Importar dotenv
import { config } from 'dotenv';
config();


// Crear el pool de conexiones
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.DBPASS,
  database: process.env.DB,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Exportar el pool
export default pool;
