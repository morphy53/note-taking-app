import { relations } from "drizzle-orm";
import { boolean, index, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { NoteTagTable } from "./noteTag";
import { UserTable } from "./user";

export const UserNotesTable = pgTable(
	"notes",
	{
		id,
		userId: varchar()
			.notNull()
			.references(() => UserTable.id),
		title: varchar().notNull(),
		isArchived: boolean().notNull().default(false),
		content: text().notNull(),
		createdAt,
		updatedAt,
	},
	(table) => [
		index("notes_user_created_idx").on(table.userId, table.createdAt),
		index("notes_title_idx").on(table.userId, table.title),
		index("notes_user_archived_idx").on(table.userId, table.isArchived),
	],
);

export const userNotesRelations = relations(
	UserNotesTable,
	({ one, many }) => ({
		user: one(UserTable, {
			fields: [UserNotesTable.userId],
			references: [UserTable.id],
		}),
		noteTags: many(NoteTagTable),
	}),
);
