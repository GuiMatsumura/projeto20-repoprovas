import { Request, Response } from 'express';
import { createUser, login } from '../services/userService';

export async function signUp(req: Request, res: Response) {
  const user = req.body;
  await createUser(user);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user = req.body;
  const token = await login(user);
  res.send({ token });
}
