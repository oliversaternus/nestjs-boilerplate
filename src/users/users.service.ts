import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ['posts'] });
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .addSelect('user.isActive')
      .addSelect('user.isConfirmed')
      .getOne();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const { firstName, lastName, username, email, password } = createUserDto;
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.refreshTokens = [];
    user.password = await bcrypt.hash(password, 10);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
