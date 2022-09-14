import { prisma } from '../config/prismaClient';
import { User } from '../types/userType';

export async function findUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}

export async function insertUser(user: User) {
  return prisma.users.create({
    data: user,
  });
}
