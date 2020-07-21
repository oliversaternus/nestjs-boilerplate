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

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: true, select: false })
  isActive: boolean;

  @Column({ default: false, select: false })
  isConfirmed: boolean;

  @Column({ select: false })
  password: string;

  @Column("simple-array", { select: false })
  refreshTokens: string[];

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}