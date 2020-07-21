import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column()
  password: string;

  @Column("simple-array")
  refreshTokens: string[];

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}