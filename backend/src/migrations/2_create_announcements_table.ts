import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('announcements', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.date('publicationDate').notNullable();
    table.specificType('categoryIds', 'integer[]');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}
//
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('announcements');
}
