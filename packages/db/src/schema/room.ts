import { pgTable, text, uuid, timestamp, primaryKey } from 'drizzle-orm/pg-core';

import { user } from './auth-schema.js';

export const room = pgTable('room', {
  id: uuid('id').primaryKey().defaultRandom(),

  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),

  description: text('description'),

  imageUrl: text('image_url'),

  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const roomMember = pgTable(
  'room_member',
  {
    roomId: uuid('room_id')
      .notNull()
      .references(() => room.id, { onDelete: 'cascade' }),

    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),

    role: text('role').notNull().default('member'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [
    primaryKey({
      columns: [table.roomId, table.userId],
    }),
  ],
);

export type NewRoom = typeof room.$inferInsert;
export type Room = typeof room.$inferSelect;
