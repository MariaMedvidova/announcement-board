import type { Knex } from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  await knex('announcements').del();

  const categories = await knex('categories').select('id');
  const categoryIds = categories.map(c => c.id);

  const announcements = [];
  for (let i = 0; i < 105; i++) {
    announcements.push({
      title: faker.lorem.sentence(2),
      content: faker.lorem.paragraphs(1),
      publicationDate: faker.date.past(),
      categoryIds: [faker.helpers.arrayElement(categoryIds)],
    });
  }

  await knex('announcements').insert(announcements);
}
