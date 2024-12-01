import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users';
import { ProductsModule } from './products';
import { DatabaseModule } from './sequelize';
import { JwtMiddlewareModule } from './middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ProductsModule,
    AuthModule,
    JwtMiddlewareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
