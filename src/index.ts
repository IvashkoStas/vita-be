import 'reflect-metadata';
import 'module-alias/register';
import { createExpressServer, useContainer } from 'routing-controllers';
import container from 'src/config/inversify.config';
import TYPES from 'src/constants/types';
import { IConfigService } from 'src/config/config.service.interface';
import { IPrismaService } from 'src/prisma/prisma.service.interface';
import { ILogger } from 'src/logger/logger.service.interface';
import { UserController } from 'src/user/user.controller';
import { HttpErrorHandler } from 'src/middlewares/http-error-handler';
import { VitaminController } from 'src/vitamin/vitamin.controller';
import { FavoriteController } from 'src/favorite/favorite.controller';
import { AuthHandler } from 'src/middlewares/auth-handler';


const bootstrap = async (): Promise<void> => {
  useContainer(container);

  const prismaService = container.get<IPrismaService>(TYPES.PrismaService);
  const logger = container.get<ILogger>(TYPES.LoggerService);
  const config = container.get<IConfigService>(TYPES.ConfigService);
  const PORT = config.get<number>('PORT');

  await prismaService.connection();

  const controllers = [
    UserController,
    FavoriteController,
    VitaminController,
  ];

  const middlewares = [
    HttpErrorHandler,
    AuthHandler,
  ];

  const app = createExpressServer({
    defaultErrorHandler: false,
    controllers,
    middlewares,
  });
  app.listen(PORT, () =>  logger.log(`🚀 The server was started on the port: ${PORT}`));
};


bootstrap();