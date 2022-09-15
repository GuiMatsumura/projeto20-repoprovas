import { Request, Response } from 'express';
import {
  sendExam,
  showExamDisciplineService,
  showExamTeacherService,
} from '../services/examService';

export async function createExam(req: Request, res: Response) {
  const exam = req.body;

  await sendExam(exam);
  res.sendStatus(201);
}

export async function showExamDiscipline(req: Request, res: Response) {
  const exams = await showExamDisciplineService();
  res.status(200).send(exams);
}

export async function showExamTeacher(req: Request, res: Response) {
  const exams = await showExamTeacherService();
  res.status(200).send(exams);
}
