import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: { user: true }, 
    });
    res.status(200).json(task);
  } else if (req.method === 'PUT') {
    const { name, status, userId } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { name, status, userId },
    });
    res.status(200).json(task);
  } else if (req.method === 'DELETE') {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
