import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ['posts'] });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const { firstName, lastName, password } = createUserDto;
    user.firstName = firstName;
    user.lastName = lastName;
    user.refreshTokens = [];
    user.password = await bcrypt.hash(password, 10);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
