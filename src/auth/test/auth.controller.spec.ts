import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { UsersService } from '../../users/users.service';
import { createMock } from '@golevelup/nestjs-testing';
import { Repository } from 'typeorm';
import { User } from '../../users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth.constants';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../local.strategy';
import { JwtStrategy } from '../jwt.strategy';

describe('Users Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMock<Repository<User>>(),
        }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});