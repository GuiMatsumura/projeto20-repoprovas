import { Router } from 'express';
import {
  createExam,
  showExamDiscipline,
  showExamTeacher,
} from '../controllers/examController';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { createExamSchema } from '../schemas/examSchema';
import { validExam } from '../middlewares/validExam';

const examRouter = Router();

examRouter.use(ensureAuthenticatedMiddleware);
examRouter.post(
  '/exam',
  validateSchemaMiddleware(createExamSchema),
  validExam,
  createExam
);
examRouter.get('/exam/discipline', showExamDiscipline);
examRouter.get('/exam/teacher', showExamTeacher);

export default examRouter;
