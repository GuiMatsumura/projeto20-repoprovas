import { NextFunction, Request, Response } from 'express';
import { ICreateExam } from '../types/examType';
import {
  existingExam,
  existingCategory,
  existingTeacherDiscipline,
} from '../services/examService';
import { notFoundError } from '../utils/errorUtils';

export async function validExam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exam: ICreateExam = req.body;
  await existingExam(exam);

  const category = await existingCategory(exam.categoryId);
  if (!category) throw notFoundError('Category not exist');

  const teacherDiscipline = await existingTeacherDiscipline(
    exam.teacherDisciplineId
  );
  if (!teacherDiscipline) throw notFoundError('TeacherDiscipline not exist');

  next();
}
