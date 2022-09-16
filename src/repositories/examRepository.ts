import { prisma } from '../config/prismaClient';
import { ICreateExam } from '../types/examType';

export async function getExamByUrl(url: string) {
  return prisma.tests.findFirst({
    where: { pdfUrl: url },
  });
}

export async function insertExam(exam: ICreateExam) {
  return prisma.tests.create({
    data: exam,
  });
}

export async function findCategoryById(id: number) {
  return prisma.categories.findUnique({
    where: { id },
  });
}

export async function findTeacherDisciplineById(id: number) {
  return prisma.teachersDisciplines.findUnique({
    where: { id },
  });
}

export async function showExamByDiscipline() {
  return await prisma.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          teachersDisciplines: {
            include: {
              teachers: {
                select: {
                  name: true,
                },
              },
              tests: {
                include: {
                  categories: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function showExamByTeacher() {
  return await prisma.teachers.findMany({
    select: {
      id: true,
      name: true,
      teachersDisciplines: {
        include: {
          disciplines: true,
          tests: {
            include: {
              categories: true,
            },
          },
        },
      },
    },
  });
}
