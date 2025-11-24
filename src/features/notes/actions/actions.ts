"use server";
import { and, eq } from "drizzle-orm/sql";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { redirect } from "next/navigation";
import type z from "zod";
import { db } from "@/drizzle/db";
import { UserNotesTable } from "@/drizzle/schema";
import { deleteNoteTag, insertNoteTag } from "@/features/noteTags/db/noteTags";
import { insertTag } from "@/features/tags/db/tags";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";
import { getNoteIdTag } from "../db/cache/notes";
import { deleteNote, insertNote, updateNote } from "../db/note";
import { splitString } from "../lib/utils";
import { notesSchema } from "./schemas";

export async function createUserNote(unsafeData: z.infer<typeof notesSchema>) {
	const { userId } = await getCurrentUser();
	if (userId == null) {
		return {
			error: true,
			message: "You don't have permission to create a note",
		};
	}
	const { success, data } = notesSchema.safeParse(unsafeData);
	if (!success) {
		return {
			error: true,
			message: "There was an error creating your note",
		};
	}
	const tagsList = splitString(data.tags, ",");
	const [note, ...tags] = await Promise.all([
		insertNote({
			...data,
			userId,
		}),
		...tagsList.map((tag) => insertTag({ userId, tagName: tag })),
	]);
	await Promise.all(
		tags.map((tag) => insertNoteTag({ noteId: note.id, tagId: tag.id })),
	);
	redirect(`/notes/${note.id}`);
}

export async function updateUserNote(
	id: string,
	unsafeData: z.infer<typeof notesSchema>,
) {
	const { userId } = await getCurrentUser();
	if (userId == null) {
		return {
			error: true,
			message: "You don't have permission to update a note",
		};
	}
	const userNote = await getUserNote(userId, id);
	if (!userNote) {
		return {
			error: true,
			message: "You don't have permission to update a note",
		};
	}
	const { success, data } = notesSchema.safeParse(unsafeData);
	if (!success) {
		return {
			error: true,
			message: "There was an error creating your note",
		};
	}
	const tagsList = splitString(data.tags, ",");
	const [_, updatedNote, ...tags] = await Promise.all([
		deleteNoteTag(id),
		updateNote(id, {
			...data,
			userId,
		}),
		...tagsList.map((tag) => insertTag({ userId, tagName: tag })),
	]);
	await Promise.all(
		tags.map((tag) => insertNoteTag({ noteId: updatedNote.id, tagId: tag.id })),
	);
	redirect(`/notes/${id}`);
}

export async function deleteUserNote(noteId: string) {
	const { userId } = await getCurrentUser();
	if (userId == null) {
		return {
			error: true,
			message: "You don't have permission to delete a note",
		};
	}
	const userNote = await getUserNote(userId, noteId);
	if (!userNote) {
		return {
			error: true,
			message: "You don't have permission to delete a note",
		};
	}
	await deleteNote(noteId);
	redirect("/notes");
}

export async function updateNoteArchivalStatus(
	noteId: string,
	archive: boolean,
) {
	const { userId } = await getCurrentUser();
	if (userId == null) {
		return {
			error: true,
			message: "You don't have permission to delete a note",
		};
	}
	const userNote = await getUserNote(userId, noteId);
	if (!userNote) {
		return {
			error: true,
			message: "You don't have permission to delete a note",
		};
	}
	await updateNote(noteId, { isArchived: archive });
}

async function getUserNote(userId: string, noteId: string) {
	"use cache";
	cacheTag(getNoteIdTag(noteId));
	return db.query.UserNotesTable.findFirst({
		where: and(
			eq(UserNotesTable.userId, userId),
			eq(UserNotesTable.id, noteId),
		),
		columns: {
			id: true,
		},
	});
}
