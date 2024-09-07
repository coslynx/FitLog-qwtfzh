import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/utils/db';
import { Goal } from '@/utils/models';

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
        const goals = await db.collection('goals').find({ userId }).toArray();
        return res.status(200).json(goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
        return res.status(500).json({ message: 'Failed to fetch goals' });
      }

    case 'POST':
      try {
        const { name, type, target, deadline } = req.body;

        const newGoal = new Goal({ userId, name, type, target, deadline });

        const result = await db.collection('goals').insertOne(newGoal);
        return res.status(201).json({ message: 'Goal created', data: result });
      } catch (error) {
        console.error('Error creating goal:', error);
        return res.status(500).json({ message: 'Failed to create goal' });
      }

    case 'PUT':
      try {
        const { id, name, type, target, deadline } = req.body;

        const updatedGoal = { name, type, target, deadline };

        const result = await db.collection('goals').updateOne(
          { _id: id },
          { $set: updatedGoal }
        );
        return res.status(200).json({ message: 'Goal updated', data: result });
      } catch (error) {
        console.error('Error updating goal:', error);
        return res.status(500).json({ message: 'Failed to update goal' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;

        const result = await db.collection('goals').deleteOne({ _id: id });
        return res.status(200).json({ message: 'Goal deleted', data: result });
      } catch (error) {
        console.error('Error deleting goal:', error);
        return res.status(500).json({ message: 'Failed to delete goal' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}