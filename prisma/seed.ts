import { prisma } from '../src/config/prismaClient';

async function createTerm(number: number) {
  await prisma.terms.upsert({
    where: { number },
    update: {},
    create: { number },
  });
}

async function createCategory(name: string) {
  await prisma.categories.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function createTeacher(name: string) {
  await prisma.teachers.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function createDiscipline(name: string, termId: number) {
  await prisma.disciplines.upsert({
    where: { name },
    update: {},
    create: { name, termId },
  });
}

async function createTeacherDiscipline(
  teacherId: number,
  disciplineId: number
) {
  await prisma.teachersDisciplines.create({
    data: { teacherId, disciplineId },
  });
}

async function main() {
  createTerm(1);
  createTerm(2);
  createTerm(3);
  createTerm(4);
  createTerm(5);
  createTerm(6);
  createCategory('Projeto');
  createCategory('Prática');
  createCategory('Recuperação');
  createTeacher('Diego Pinho');
  createTeacher('Bruna Hamori');
  createDiscipline('HTML e CSS', 1);
  createDiscipline('JavaScript', 2);
  createDiscipline('React', 3);
  createDiscipline('Humildade', 1);
  createDiscipline('Planejamento', 2);
  createDiscipline('Autoconfiança', 3);
  createTeacherDiscipline(1, 1);
  createTeacherDiscipline(1, 2);
  createTeacherDiscipline(1, 3);
  createTeacherDiscipline(2, 4);
  createTeacherDiscipline(2, 5);
  createTeacherDiscipline(2, 6);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
