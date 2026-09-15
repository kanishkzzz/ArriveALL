import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey(),
  username: varchar(255).notNull(),
  email: varchar(255).notNull(),
  password: varchar(255).notNull(),
  name: varchar(255).notNull(),
  contact: integer().notNull(),
})