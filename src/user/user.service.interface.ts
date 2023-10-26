import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';

export class IUserService {
  createUser: (user: CreateUserDto) => Promise<User>;
  getAll: () => Promise<User[]>;
  getUser: (id: string) => Promise<User | null>;
  updateUser: (user: UpdateUserDto, id: string) => Promise<User | null>;
  deleteUser: (id: string) => Promise<boolean>;
}
