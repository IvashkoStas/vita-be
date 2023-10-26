import { inject, injectable } from 'inversify';
import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put } from 'routing-controllers';
import { User } from '@prisma/client';
import TYPES from 'src/constants/types';
import { ILogger } from 'src/logger/logger.service.interface';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUserService } from './user.service.interface';

@injectable()
@JsonController('/user')
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: IUserService,
    @inject(TYPES.LoggerService) private readonly logger: ILogger
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    this.logger.log(`create user: ${user.name}`);
    return await this.userService.createUser(user);
  }

  @Get()
  async getAll(): Promise<User[]> {
    this.logger.log('get all users');
    return await this.userService.getAll();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    this.logger.log(`get user by id: ${id}`);
    return await this.userService.getUser(id).catch(() => {
      this.logger.error(`❌ error get user by id: ${id}}`);
      return null;
    });
  }

  @Put('/:id')
  async updateUser(@Body() user: UpdateUserDto, @Param('id') id: string): Promise<User | null> {
    this.logger.log(`update user by id: ${id}`);
    return await this.userService.updateUser(user, id).catch(() => {
      this.logger.error(`❌ error update user by id: ${id}`);
      return null;
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    this.logger.log(`delete user by id: ${id}`);
    return await this.userService.deleteUser(id).catch(() => {
      this.logger.error(`❌ error delete user by id: ${id}`);
      return false;
    });
  }
}