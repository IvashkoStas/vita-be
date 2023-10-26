import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { BadRequestError } from 'routing-controllers';
import { IPrismaService } from 'src/prisma/prisma.service.interface';
import TYPES from 'src/constants/types';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUserService } from './user.service.interface';


@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: IPrismaService,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    return this.prismaService.prisma.user.create({
      data: user,
    });
  }

  async getUser(id: string): Promise<User | null> {
    try {
      return await this.checkUserById(id);
    } catch (error) {
      return null;
    }
  }

  async getAll(): Promise<User[]> {
    return this.prismaService.prisma.user.findMany({});
  }

  async updateUser(user: UpdateUserDto, id: string): Promise<User | null> {
    try {
      this.checkUserById(id);
      return await this.prismaService.prisma.user.update({
        where: { id },
        data: user,
      });
    } catch (error) {
      return null;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const user = await this.checkUserById(id);
      await this.deleteUserAndAssociatedData(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async checkUserById(id: string): Promise<User> {
    const existUser = await this.prismaService.prisma.user.findUnique({
      where: { id },
    });
    if (!existUser) {
      throw new BadRequestError('Такого пользователя не существует');
    }
    return existUser;
  }

  private async deleteUserAndAssociatedData(user: User): Promise<void> {
    await this.prismaService.prisma.user.delete({
      where: { id: user.id },
      include: {
        favorites: {
          include: {
            vitamins: {
              include: {
                combinations: true,
                conditions: true,
                norm: true,
              },
            },
          },
        },
      },
    });
  }
}