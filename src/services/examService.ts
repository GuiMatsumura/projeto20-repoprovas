import { ICreateExam } from '../types/examType';
import {
  getExamByUrl,
  insertExam,
  showExamByDiscipline,
  showExamByTeacher,
} from '../repositories/examRepository';
import { conflictError } from '../utils/errorUtils';

export async function sendExam(exam: ICreateExam) {
  const existingExam = await getExamByUrl(exam.pdfUrl);

  if (existingExam) throw conflictError('Exam already exist');

  await insertExam(exam);
}

export async function showExamDisciplineService() {
  return await showExamByDiscipline();
}

export async function showExamTeacherService() {
  return await showExamByTeacher();
}
