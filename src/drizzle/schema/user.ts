import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { UserNotesTable } from "./note";
import { UserTagTable } from "./tag";

export const UserTable = pgTable("users", {
	id: varchar().primaryKey(),
	name: varchar().notNull(),
	imageUrl: varchar().notNull(),
	email: varchar().notNull().unique(),
	createdAt,
	updatedAt,
});

export const userRelations = relations(UserTable, ({ many }) => ({
	notes: many(UserNotesTable),
	tags: many(UserTagTable),
}));
