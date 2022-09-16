import { ICreateExam } from '../types/examType';
import {
  getExamByUrl,
  insertExam,
  showExamByDiscipline,
  showExamByTeacher,
  findCategoryById,
  findTeacherDisciplineById,
} from '../repositories/examRepository';
import { conflictError } from '../utils/errorUtils';

export async function existingExam(exam: ICreateExam) {
  const existingExam = await getExamByUrl(exam.pdfUrl);

  if (existingExam) throw conflictError('Exam already exist');
}

export async function sendExam(exam: ICreateExam) {
  await insertExam(exam);
}

export async function showExamDisciplineService() {
  return await showExamByDiscipline();
}

export async function showExamTeacherService() {
  return await showExamByTeacher();
}

export async function existingCategory(id: number) {
  return await findCategoryById(id);
}

export async function existingTeacherDiscipline(id: number) {
  return await findTeacherDisciplineById(id);
}
