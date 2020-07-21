import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

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

    create(post: Post) {
        this.postsRepository.create(post);
    }

    async remove(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }
}