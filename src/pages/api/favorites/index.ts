import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('favorites');

  if (req.method === 'GET') {
    const favorites = await collection.find({}).toArray();
    res.status(200).json(favorites);
  } else if (req.method === 'POST') {
    const { recipeId, recipeName, imageUrl } = req.body;
    if (!recipeId || !recipeName || !imageUrl) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const result = await collection.insertOne({ recipeId, recipeName, imageUrl });
    res.status(201).json(result);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
