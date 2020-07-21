import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
        return await this.postsService.create(createPostDto);
    }

    @Get()
    async findAll(): Promise<PostEntity[]> {
        return await this.postsService.findAll();
    }
}
