
import mysql from "mysql2/promise";

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456", 
    database: "schoolDB",
    port: 3306
  });
  return connection;
}
