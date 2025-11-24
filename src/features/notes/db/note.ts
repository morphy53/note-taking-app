import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { UserNotesTable } from "@/drizzle/schema";
import { revalidateNoteCache } from "./cache/notes";

export async function insertNote(
	notes: Omit<typeof UserNotesTable.$inferInsert, "id">,
) {
	const [newNote] = await db.insert(UserNotesTable).values(notes).returning({
		id: UserNotesTable.id,
		userId: UserNotesTable.userId,
	});

	revalidateNoteCache(newNote);

	return newNote;
}

export async function updateNote(
	id: string,
	note: Partial<typeof UserNotesTable.$inferInsert>,
) {
	const [updatedNote] = await db
		.update(UserNotesTable)
		.set(note)
		.where(eq(UserNotesTable.id, id))
		.returning({
			id: UserNotesTable.id,
			userId: UserNotesTable.userId,
		});

	revalidateNoteCache(updatedNote);

	return updatedNote;
}

export async function deleteNote(id: string) {
	const [deletedNote] = await db
		.delete(UserNotesTable)
		.where(eq(UserNotesTable.id, id))
		.returning({
			id: UserNotesTable.id,
			userId: UserNotesTable.userId,
		});

	revalidateNoteCache(deletedNote);

	return deletedNote;
}
