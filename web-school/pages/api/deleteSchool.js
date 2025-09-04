import { connectToDatabase } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "School ID is required" });
  }

  try {
    const db = await connectToDatabase();
    await db.execute("DELETE FROM schools WHERE id = ?", [id]);

    res.status(200).json({ message: "School deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Failed to delete school" });
  }
}
