import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').del();
  await knex('categories').insert([
    { name: 'Technology' },
    { name: 'Health' },
    { name: 'Finance' },
    { name: 'Education' },
    { name: 'Entertainment' },
  ]);
}