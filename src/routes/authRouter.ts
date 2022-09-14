import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { signUpSchema, signInSchema } from '../schemas/userSchema';

const authRouter = Router();

authRouter.post('/signup', validateSchemaMiddleware(signUpSchema), signUp);
authRouter.post('/signin', validateSchemaMiddleware(signInSchema), signIn);

export default authRouter;
