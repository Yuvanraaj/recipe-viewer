import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('favorites');

  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id as string) });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Delete failed', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
