
import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  const db = await connectToDatabase();
  const [rows] = await db.execute('SELECT id, name, address, city, image FROM schools');
  res.status(200).json(rows);
}
