import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	age: integer('age'),
	username: text('username').unique().notNull()
});

export const word = sqliteTable('word', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	character: text('character').notNull().unique(),
	definition: text('definition').notNull(),
	pinyin: text('pinyin').notNull(),
	lvl: text('lvl').notNull(),
	randomTest: text('randomTest')
})
