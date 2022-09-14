import { Request, Response } from 'express';
import { createUser } from '../services/userService';

export async function signUp(req: Request, res: Response) {
  const user = req.body;
  await createUser(user);
  res.sendStatus(201);
}
