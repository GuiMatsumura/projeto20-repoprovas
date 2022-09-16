import { prisma } from '../src/config/prismaClient';
import supertest from 'supertest';
import app from '../src/app';
import { signUpFactory, signInFactory } from './factories/authFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testing POST /singup', () => {
  it('Create a user, return 201 status code', async () => {
    const user = await signUpFactory('123', '123');
    const data = await supertest(app).post('/signup').send(user);

    expect(data.status).toBe(201);
  });

  it('Create a user with diferent password, return 422 status code', async () => {
    const user = await signUpFactory('123', '1');
    const data = await supertest(app).post('/signup').send(user);

    expect(data.status).toBe(422);
  });

  it('Create a user with no password, return 422 status code', async () => {
    const user = await signUpFactory('', '');
    const data = await supertest(app).post('/signup').send(user);

    expect(data.status).toBe(422);
  });

  it('Create a user with no email, return 422 status code', async () => {
    const user = await signUpFactory('123', '123');
    user.email = '';
    await supertest(app).post('/signup').send(user);
    const data = await supertest(app).post('/signup').send(user);

    expect(data.status).toBe(422);
  });

  it('Create a existing user, return 409 status code', async () => {
    const user = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(user);
    const data = await supertest(app).post('/signup').send(user);

    expect(data.status).toBe(409);
  });
});

describe('Testing POST /singin', () => {
  it('Login with a existing user, return 200 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);

    const user = await signInFactory(createdUser.email, createdUser.password);

    const data = await supertest(app).post('/signin').send(user);

    expect(data.status).toBe(200);
  });

  it('Login with a wrong user, return 401 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);

    const user = await signInFactory(createdUser.email, '1');

    const data = await supertest(app).post('/signin').send(user);

    expect(data.status).toBe(401);
  });

  it('Login with a invalid password, return 422 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);

    const user = await signInFactory(createdUser.email, '');

    const data = await supertest(app).post('/signin').send(user);

    expect(data.status).toBe(422);
  });

  it('Login with a invalid email, return 422 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);

    const user = await signInFactory('', createdUser.password);

    const data = await supertest(app).post('/signin').send(user);

    expect(data.status).toBe(422);
  });
});
