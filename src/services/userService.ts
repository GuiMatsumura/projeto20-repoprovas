import { ISingUphUser } from '../types/userType';
import { findUserByEmail, insertUser } from '../repositories/userRepository';
import { conflictError } from '../utils/errorUtils';
import bcrypt from 'bcrypt';

export async function createUser(user: ISingUphUser) {
  const existingUser = await findUserByEmail(user.email);

  if (existingUser) {
    throw conflictError('Usuário já existe!');
  }

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(user.password, SALT);

  await insertUser({ email: user.email, password: hashedPassword });
}
