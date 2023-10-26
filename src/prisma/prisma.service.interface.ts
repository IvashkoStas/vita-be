import { PrismaClient } from '@prisma/client';

export interface IPrismaService {
  prisma: PrismaClient
  connection: () => Promise<{
    [Symbol.asyncDispose]: () => Promise<void>
  }>
}