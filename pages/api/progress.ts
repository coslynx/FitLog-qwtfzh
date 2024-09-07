import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/utils/db';
import { Progress } from '@/utils/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();

  const userId = session.user.id;

  switch (req.method) {
    case 'GET':
      try {
        const progressData = await db.collection('progress').find({ userId }).toArray();
        return res.status(200).json(progressData);
      } catch (error) {
        console.error('Error fetching progress data:', error);
        return res.status(500).json({ message: 'Failed to fetch progress data' });
      }

    case 'POST':
      try {
        const { goalId, date, activity, metrics } = req.body;

        const newProgress = new Progress({ userId, goalId, date, activity, metrics });

        const result = await db.collection('progress').insertOne(newProgress);
        return res.status(201).json({ message: 'Progress data created', data: result });
      } catch (error) {
        console.error('Error creating progress data:', error);
        return res.status(500).json({ message: 'Failed to create progress data' });
      }

    case 'PUT':
      try {
        const { id, goalId, date, activity, metrics } = req.body;

        const updatedProgress = { goalId, date, activity, metrics };

        const result = await db.collection('progress').updateOne({ _id: id }, { $set: updatedProgress });
        return res.status(200).json({ message: 'Progress data updated', data: result });
      } catch (error) {
        console.error('Error updating progress data:', error);
        return res.status(500).json({ message: 'Failed to update progress data' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;

        const result = await db.collection('progress').deleteOne({ _id: id });
        return res.status(200).json({ message: 'Progress data deleted', data: result });
      } catch (error) {
        console.error('Error deleting progress data:', error);
        return res.status(500).json({ message: 'Failed to delete progress data' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}