import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) { }

    findAll(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    findOne(id: string): Promise<Post> {
        return this.postsRepository.findOne(id);
    }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const post = new Post();
        const { text, userId } = createPostDto;
        Object.assign(post, { text });
        const user = new User();
        user.id = userId;
        post.user = user;
        return this.postsRepository.save(post);
    }

    async remove(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }
}