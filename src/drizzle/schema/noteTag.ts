import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "../schemaHelpers";
import { UserNotesTable } from "./note";
import { UserTagTable } from "./tag";

export const NoteTagTable = pgTable(
	"noteTags",
	{
		tagId: uuid()
			.references(() => UserTagTable.id, { onDelete: "cascade" })
			.notNull(),
		noteId: uuid()
			.references(() => UserNotesTable.id, { onDelete: "cascade" })
			.notNull(),
		createdAt,
	},
	(table) => [primaryKey({ columns: [table.tagId, table.noteId] })],
);

export const NoteTagRelations = relations(NoteTagTable, ({ one }) => ({
	tag: one(UserTagTable, {
		fields: [NoteTagTable.tagId],
		references: [UserTagTable.id],
	}),
	note: one(UserNotesTable, {
		fields: [NoteTagTable.noteId],
		references: [UserNotesTable.id],
	}),
}));
