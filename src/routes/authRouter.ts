import { Router } from 'express';
import { signUp } from '../controllers/authController';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { signUpSchema } from '../schemas/signUpSchema';

const authRouter = Router();

authRouter.post('/signup', validateSchemaMiddleware(signUpSchema), signUp);

export default authRouter;
