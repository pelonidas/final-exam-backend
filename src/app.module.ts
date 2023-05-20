import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { PlaceLocationService } from './place_location/place_location.service';
import { PlaceService } from './place/place.service';
import { PlaceController } from './place/place.controller';
import { PlaceLocationController } from './place_location/place_location.controller';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [
    TodoController,
    PlaceController,
    PlaceLocationController,
    UserController,
  ],
  providers: [
    PrismaService,
    UserService,
    TodoService,
    PlaceLocationService,
    PlaceService,
  ],
})
export class AppModule {}
