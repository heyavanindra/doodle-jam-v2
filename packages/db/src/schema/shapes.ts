import { integer, json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { room } from './room.js';

export const shapes = pgTable('shapes', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  roomId: uuid('room_id')
    .notNull()
    .references(() => room.id, { onDelete: 'cascade' }),
  data: json('data').notNull(),
  zIndex: integer('z_index').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type NewShape = typeof shapes.$inferInsert;
export type Shape = typeof shapes.$inferSelect;
