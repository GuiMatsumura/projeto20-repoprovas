import { ISingUphUser, User } from '../types/userType';
import { findUserByEmail, insertUser } from '../repositories/userRepository';
import { conflictError, unauthorizedError } from '../utils/errorUtils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(user: ISingUphUser) {
  const existingUser = await findUserByEmail(user.email);

  if (existingUser) {
    throw conflictError('Usuário já existe!');
  }

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(user.password, SALT);

  await insertUser({ email: user.email, password: hashedPassword });
}

export async function login(login: User) {
  const user = await getUserOrFail(login);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
}

async function getUserOrFail(login: User) {
  const user = await findUserByEmail(login.email);
  if (!user) throw unauthorizedError('Invalid credentials');

  const isPasswordValid = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordValid) throw unauthorizedError('Invalid credentials');
  return user;
}
