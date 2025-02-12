import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const { firstName, lastName } = req.body;
    console.log("prisma user create");
    console.log(req.body);
    console.log(firstName, lastName);
    console.log("prisma user create");
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { firstName, lastName },
    });
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    await prisma.users.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
