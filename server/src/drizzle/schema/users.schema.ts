import { pgTable, serial, text, pgEnum, timestamp } from 'drizzle-orm/pg-core';

export const loginTypeEnum = pgEnum('users_loginType', [
  'email',
  'kakao',
  'apple',
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  nickname: text('nickname').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  loginType: loginTypeEnum('users_loginType').default('email').notNull(),
  imageUri: text('imageUri'),
  kakaoImageUri: text('kakaoImageUri'),
  hashedRefreshToken: text('hashedRefreshToken'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
});

export type UserSelectType = typeof users.$inferSelect;
export type UserInsertType = typeof users.$inferInsert;
