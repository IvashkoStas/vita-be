import { IsNotEmpty } from 'class-validator';
import { IUser } from '../user.interface';

export class CreateUserDto implements  IUser {
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  name: string;
}
