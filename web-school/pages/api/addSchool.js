
import { connectToDatabase } from '../../lib/db';
import multer from 'multer';
import path from 'path';

export const config = { api: { bodyParser: false } };

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/schoolImages',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('image')(req, res, async (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const { name, address, city, state, contact, email_id } = req.body;
      const image = req.file ? `/schoolImages/${req.file.filename}` : null;

      const db = await connectToDatabase();
      await db.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, image, email_id]
      );
      res.status(200).json({ message: 'School added successfully!' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
