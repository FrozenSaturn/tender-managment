/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('companies', function(table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('industry', 255);
      table.text('description');
      table.string('logo_url', 255);
    })
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('email', 255).notNullable().unique();
      table.string('password_hash', 255).notNullable();
      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE');
    })
    .createTable('tenders', function(table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.text('description').notNullable();
      table.timestamp('deadline').notNullable();
      table.decimal('budget', 14, 2);
      table.integer('company_id').unsigned().notNullable().references('id').inTable('companies').onDelete('CASCADE');
    })
    .createTable('applications', function(table) {
      table.increments('id').primary();
      table.text('proposal').notNullable();
      table.integer('tender_id').unsigned().notNullable().references('id').inTable('tenders').onDelete('CASCADE');
      table.integer('company_id').unsigned().notNullable().references('id').inTable('companies').onDelete('CASCADE');
      table.unique(['tender_id', 'company_id']); // A company can only apply once per tender
    })
    .createTable('goods_and_services', function(table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.text('description');
      table.integer('company_id').unsigned().notNullable().references('id').inTable('companies').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('goods_and_services')
    .dropTableIfExists('applications')
    .dropTableIfExists('tenders')
    .dropTableIfExists('users')
    .dropTableIfExists('companies');
};