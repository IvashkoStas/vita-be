import { PrismaClient } from '@prisma/client';
import { vitamins } from './vitamins';
const prisma = new PrismaClient();

export const createVitamins = async (): Promise<void> => {
  const v = await prisma.vitamin.deleteMany({});
  for (const vitamin of Object.values(vitamins)) {
    await prisma.vitamin.create(vitamin);
  }
  const all = await prisma.vitamin.findMany({});
};
