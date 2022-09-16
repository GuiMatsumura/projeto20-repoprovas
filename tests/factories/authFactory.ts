import { faker } from '@faker-js/faker';

export async function signUpFactory(pass1: string, pass2: string) {
  return {
    email: faker.internet.email(),
    password: pass1,
    confirmPassword: pass2,
  };
}

export async function signInFactory(email: string, password: string) {
  return {
    email,
    password,
  };
}

export async function createUser() {}
