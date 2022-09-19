import { prisma } from '../src/config/prismaClient';
import supertest from 'supertest';
import app from '../src/app';
import { createExamFactory } from './factories/examFactory';
import { signUpFactory, signInFactory } from './factories/authFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testing POST /exam', () => {
  it('Create a exam, return 201 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);
    const loggedUserBody = await signInFactory(createdUser.email, '123');
    const loggedUser = await supertest(app)
      .post('/signin')
      .send(loggedUserBody);
    const authorization = loggedUser.text;
    const token = authorization.slice(10).replace(/["}]/g, '');
    console.log(authorization);
    console.log(token);

    const exam = await createExamFactory('', '', 0, 0);

    const data = await supertest(app)
      .post('/exam')
      .send(exam)
      .set({ Authorization: `Bearer ${token}` });
    expect(data.status).toBe(201);
  });

  it('Create a exam with no authorization, return 401 status code', async () => {
    const exam = await createExamFactory('', '', 0, 0);

    const data = await supertest(app).post('/exam').send(exam);

    expect(data.status).toBe(401);
  });

  it('Create a exam with no name, return 422 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);
    const loggedUserBody = await signInFactory(createdUser.email, '123');
    const loggedUser = await supertest(app)
      .post('/signin')
      .send(loggedUserBody);
    const authorization = loggedUser.text;
    const token = authorization.slice(10).replace(/["}]/g, '');

    const exam = await createExamFactory('', '', 0, 0);
    exam.name = '';

    const data = await supertest(app)
      .post('/exam')
      .send(exam)
      .set({ Authorization: `Bearer ${token}` });
    expect(data.status).toBe(422);
  });

  it('Create a exam with no pdfurl, return 422 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);
    const loggedUserBody = await signInFactory(createdUser.email, '123');
    const loggedUser = await supertest(app)
      .post('/signin')
      .send(loggedUserBody);
    const authorization = loggedUser.text;
    const token = authorization.slice(10).replace(/["}]/g, '');

    const exam = await createExamFactory('', '', 0, 0);
    exam.pdfUrl = '';

    const data = await supertest(app)
      .post('/exam')
      .send(exam)
      .set({ Authorization: `Bearer ${token}` });
    expect(data.status).toBe(422);
  });

  it('Create a exam with no categoryId, return 422 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);
    const loggedUserBody = await signInFactory(createdUser.email, '123');
    const loggedUser = await supertest(app)
      .post('/signin')
      .send(loggedUserBody);
    const authorization = loggedUser.text;
    const token = authorization.slice(10).replace(/["}]/g, '');

    const exam = await createExamFactory('', '', 0, 0);
    exam.categoryId = null;

    const data = await supertest(app)
      .post('/exam')
      .send(exam)
      .set({ Authorization: `Bearer ${token}` });
    expect(data.status).toBe(422);
  });

  it('Create a exam with no teacherDisciplineId, return 422 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);
    const loggedUserBody = await signInFactory(createdUser.email, '123');
    const loggedUser = await supertest(app)
      .post('/signin')
      .send(loggedUserBody);
    const authorization = loggedUser.text;
    const token = authorization.slice(10).replace(/["}]/g, '');

    const exam = await createExamFactory('', '', 0, 0);
    exam.teacherDisciplineId = null;

    const data = await supertest(app)
      .post('/exam')
      .send(exam)
      .set({ Authorization: `Bearer ${token}` });
    expect(data.status).toBe(422);
  });
});

describe('Testing GET /exam/discipline', () => {
  it('Get exams per discipline, return 200 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);
    const loggedUserBody = await signInFactory(createdUser.email, '123');
    const loggedUser = await supertest(app)
      .post('/signin')
      .send(loggedUserBody);
    const authorization = loggedUser.text;
    const token = authorization.slice(10).replace(/["}]/g, '');

    const data = await supertest(app)
      .post('/exam/discipline')
      .send()
      .set({ Authorization: `Bearer ${token}` });
    expect(data.body).toBeInstanceOf(Object);
  });

  it('Get exams per discipline without authorization, return 401 status code', async () => {
    const data = await supertest(app).post('/exam/discipline').send();

    expect(data.status).toBe(401);
  });
});

describe('Testing GET /exam/teacher', () => {
  it('Get exams per teacher, return 200 status code', async () => {
    const createdUser = await signUpFactory('123', '123');
    await supertest(app).post('/signup').send(createdUser);
    const loggedUserBody = await signInFactory(createdUser.email, '123');
    const loggedUser = await supertest(app)
      .post('/signin')
      .send(loggedUserBody);
    const authorization = loggedUser.text;
    const token = authorization.slice(10).replace(/["}]/g, '');

    const data = await supertest(app)
      .post('/exam/teacher')
      .send()
      .set({ Authorization: `Bearer ${token}` });
    expect(data.body).toBeInstanceOf(Object);
  });

  it('Get exams per teacher without authorization, return 401 status code', async () => {
    const data = await supertest(app).post('/exam/teacher').send();

    expect(data.status).toBe(401);
  });
});
