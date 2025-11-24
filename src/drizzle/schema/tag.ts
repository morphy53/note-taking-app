import { relations } from "drizzle-orm";
import { pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { NoteTagTable } from "./noteTag";
import { UserTable } from "./user";

export const UserTagTable = pgTable(
	"tags",
	{
		id,
		tagName: varchar().notNull(),
		userId: varchar()
			.references(() => UserTable.id, { onDelete: "cascade" })
			.notNull(),
		createdAt,
		updatedAt,
	},

	(table) => [unique("user_tag_unique").on(table.userId, table.tagName)],
);

export const TagRelations = relations(UserTagTable, ({ one, many }) => ({
	noteTags: many(NoteTagTable),
	user: one(UserTable, {
		fields: [UserTagTable.userId],
		references: [UserTable.id],
	}),
}));
