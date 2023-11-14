import { Container, ContainerModule } from 'inversify';
import TYPES from 'src/constants/types';
import { HttpErrorHandler } from 'src/middlewares/http-error-handler';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPrismaService } from 'src/prisma/prisma.service.interface';
import { ILogger } from 'src/logger/logger.service.interface';
import { LoggerService } from 'src/logger/logger.service';
import { IUserService } from 'src/user/user.service.interface';
import { UserService } from 'src/user/user.service';
import { IFavoriteService } from 'src/favorite/favorite.service.interface';
import { FavoriteService } from 'src/favorite/favorite.service';
import { IConfigService } from 'src/config/config.service.interface';
import { ConfigService } from 'src/config/config.service';
import { IVitaminService } from 'src/vitamin/vitamin.service.interface';
import { VitaminService } from 'src/vitamin/vitamin.service';

import { FavoriteController } from 'src/favorite/favorite.controller';
import { VitaminController } from 'src/vitamin/vitamin.controller';
import { UserController } from 'src/user/user.controller';
import { AuthHandler } from 'src/middlewares/auth-handler';


const middlewares = new ContainerModule((bind) => {
  bind<HttpErrorHandler>(HttpErrorHandler).to(HttpErrorHandler);
  bind<AuthHandler>(AuthHandler).to(AuthHandler);
});


const services = new ContainerModule((bind) => {
  bind<ILogger>(TYPES.LoggerService).to(LoggerService);
  bind<IPrismaService>(TYPES.PrismaService).to(PrismaService);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IVitaminService>(TYPES.VitaminService).to(VitaminService);
  bind<IFavoriteService>(TYPES.FavoriteService).to(FavoriteService);
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService);
});

const controllers = new ContainerModule((bind) => {
  bind<UserController>(UserController);
  bind<FavoriteController>(FavoriteController);
  bind<VitaminController>(VitaminController);
});


const container = new Container({ defaultScope: 'Singleton' });

try {
  container.load(middlewares);
  container.load(services);
  container.load(controllers);
} catch (error) {
  console.error('Error while configuring the container:', error);
}


export default container;