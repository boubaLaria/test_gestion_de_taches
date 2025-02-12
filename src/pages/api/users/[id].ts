import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
