import Joi from 'joi';
import { ICreateExam } from '../types/examType';

export const createExamSchema = Joi.object<ICreateExam>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  categoryId: Joi.number().min(1).required(),
  teacherDisciplineId: Joi.number().min(1).required(),
});
