import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import BoardEntity from 'src/entities/board.entity';
import { JwtModule } from '@nestjs/jwt';
import UsersEntity from 'src/entities/auth.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([BoardEntity,UsersEntity]),
  JwtModule.register({
    secret: process.env.SECRET_TOKEN,
}),],
  providers: [BoardService],
  controllers: [BoardController]
})
export class BoardModule {}
 