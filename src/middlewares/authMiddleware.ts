import { NextFunction, Request, Response } from 'express';
import { unauthorizedError } from '../utils/errorUtils';
import { findUserById } from '../services/userService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers['authorization'];
  if (!authorization) throw unauthorizedError('Missing authorization header');

  const token = authorization.replace('Bearer ', '');
  if (!token) throw unauthorizedError('Missing token');

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await findUserById(userId);
    res.locals.user = user;
    next();
  } catch {
    throw unauthorizedError('Invalid token');
  }
}
