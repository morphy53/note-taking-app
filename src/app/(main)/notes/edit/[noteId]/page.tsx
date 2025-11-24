import { and, eq } from "drizzle-orm/sql";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/drizzle/db";
import { UserNotesTable } from "@/drizzle/schema";
import NotesForm from "@/features/notes/components/NotesForm";
import { getNoteIdTag } from "@/features/notes/db/cache/notes";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";

export default function NoteEditPage({
	params,
}: PageProps<"/notes/edit/[noteId]">) {
	return (
		<Suspense>
			<SuspendedEditPage params={params} />
		</Suspense>
	);
}

async function SuspendedEditPage({
	params,
}: {
	params: Promise<{
		noteId: string;
	}>;
}) {
	const [userData, paramsData] = await Promise.all([getCurrentUser(), params]);

	const { userId } = userData;
	const { noteId } = paramsData;
	if (!userId) return;
	const userNote = await getUserNote(userId, noteId);
	if (!userNote) return notFound();
	const { noteTags, ...rest } = userNote;
	const note = {
		...rest,
		tags: noteTags.map((el) => el.tag.tagName).join(", "),
	};
	return <NotesForm note={note} />;
}

async function getUserNote(userId: string, noteId: string) {
	"use cache";
	cacheTag(getNoteIdTag(noteId));
	return db.query.UserNotesTable.findFirst({
		where: and(
			eq(UserNotesTable.userId, userId),
			eq(UserNotesTable.id, noteId),
		),
		with: {
			noteTags: {
				with: {
					tag: {
						columns: {
							tagName: true,
						},
					},
				},
			},
		},
		columns: { createdAt: false },
	});
}
