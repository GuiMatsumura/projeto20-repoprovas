import { faker } from '@faker-js/faker';

export async function createExamFactory(
  name: string,
  url: string,
  categoryId: number,
  teacherDisciplineId: number
) {
  return {
    name: name ? name : faker.name.fullName(),
    pdfUrl: url ? url : faker.internet.url(),
    categoryId: categoryId
      ? categoryId
      : faker.datatype.number({ min: 1, max: 3 }),
    teacherDisciplineId: teacherDisciplineId
      ? teacherDisciplineId
      : faker.datatype.number({ min: 1, max: 6 }),
  };
}
