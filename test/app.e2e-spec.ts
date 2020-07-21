import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { users as sampleUsers } from './sampledata';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Authentication', () => {
    let accessToken: string;

    it('/users (POST) create user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(sampleUsers[0])
        .expect(201);
    });

    it('/auth/login (POST) login', (done) => {
      const { username, password } = sampleUsers[0];
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({ username, password })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          accessToken = res.body.access_token;
          done();
        });
    });

    it('/auth/me (GET) get current user', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer ' + accessToken)
        .expect(200);
    });
  });
});
