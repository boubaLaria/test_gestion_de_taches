import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } else if (req.method === 'POST') {
        const { firstName, lastName } = req.body;
        const data = { firstName: firstName, lastName: lastName };
        const user = await prisma.users.create({
            data: data,
        });
        res.status(201).json(user);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
