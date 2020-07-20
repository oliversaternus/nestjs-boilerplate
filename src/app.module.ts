import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';

@Module({
  imports: [UsersModule, PostsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'data.db',
    entities: [User, Post],
    synchronize: true,
  })],
})
export class AppModule { }
