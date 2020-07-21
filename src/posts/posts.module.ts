import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule { }
