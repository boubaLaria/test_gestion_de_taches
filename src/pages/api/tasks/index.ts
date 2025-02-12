import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany(
        { include: { user: true } }
    );
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { name, status, userId } = req.body;
    const task = await prisma.task.create({
      data: { name, status, userId },
    });
    res.status(201).json(task);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
