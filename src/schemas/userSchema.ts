import Joi from 'joi';
import { ISingUphUser, User } from '../types/userType';

export const signUpSchema = Joi.object<ISingUphUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

export const signInSchema = Joi.object<User>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
