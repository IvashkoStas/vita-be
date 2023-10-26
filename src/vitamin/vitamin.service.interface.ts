import { Vitamin } from '@prisma/client';

export interface IVitaminService {
  findAll: () => Promise<Vitamin[]>
  getById: (id: number) => Promise<Vitamin | null>
}