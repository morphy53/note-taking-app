import { eq } from "drizzle-orm/sql";
import { db } from "@/drizzle/db";
import { NoteTagTable } from "@/drizzle/schema";

export async function insertNoteTag(
	tag: Omit<typeof NoteTagTable.$inferInsert, "createdAt">,
) {
	await db.insert(NoteTagTable).values(tag).onConflictDoNothing();
}

export async function deleteNoteTag(noteId: string) {
	await db.delete(NoteTagTable).where(eq(NoteTagTable.noteId, noteId));
}
