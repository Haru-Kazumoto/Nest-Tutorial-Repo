import {
  MiddlewareConsumer,
  Module, 
  NestModule ,
  RequestMethod
} from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { ExampleMiddleware } from './middleware/example/example.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(ExampleMiddleware).forRoutes(
        {
          path: "user",
          method: RequestMethod.GET
        },
        {
          path: "user/add",
          method: RequestMethod.POST
        }
      )
  }
}
