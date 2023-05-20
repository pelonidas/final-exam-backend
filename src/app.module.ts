import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
import { PlaceLocationModule } from './place_location/place_location.module';
import { PlaceModule } from './place/place.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    TodoModule,
    PlaceLocationModule,
    PlaceModule,
  ],
})
export class AppModule {}
