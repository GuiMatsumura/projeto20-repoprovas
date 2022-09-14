import Joi from 'joi';
import { ISingUphUser } from '../types/userType';

export const signUpSchema = Joi.object<ISingUphUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});
