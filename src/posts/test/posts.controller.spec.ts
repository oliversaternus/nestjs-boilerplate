import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/nestjs-testing';
import { Post } from '../post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Posts Controller', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: createMock<Repository<Post>>(),
        }
      ]
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
