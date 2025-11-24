import { and, desc, eq, ilike } from "drizzle-orm/sql";
import { PlusIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { NoteTagTable, UserNotesTable, UserTagTable } from "@/drizzle/schema";
import { searchNoteSchema } from "@/features/notes/actions/schemas";
import MessageBox from "@/features/notes/components/MessageBox";
import Sidebar from "@/features/notes/components/Sidebar";
import { getNoteIdTag, getNotesUserTag } from "@/features/notes/db/cache/notes";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";

export default function SidePage({ searchParams }: PageProps<"/notes">) {
	return (
		<div className="w-2xs p-4 border-r flex flex-col gap-y-4">
			<Button asChild className="bg-blue-500">
				<Link
					href={"/notes/new"}
					className="flex justify-center items-center w-full"
				>
					<PlusIcon className="align-middle" />
					Create note
				</Link>
			</Button>
			<Suspense>
				<SuspendedSidepage searchParams={searchParams} />
			</Suspense>
		</div>
	);
}

async function SuspendedSidepage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const { userId } = await getCurrentUser();
	if (!userId) return redirect("/sign-in");
	const params = await searchParams;
	const { success, data } = searchNoteSchema.safeParse(params);
	const search = success ? data : {};
	const userNotes = await getNotes(userId, search);

	return (
		<>
			<MessageBox noteCount={userNotes.length} search={search} />
			<Sidebar notes={userNotes} />
		</>
	);
}

async function getNotes(
	userId: string,
	params: z.infer<typeof searchNoteSchema>,
) {
	"use cache";
	cacheTag(getNotesUserTag(userId));

	const { q, tag, archived } = params;

	const qb = db
		.select({
			id: UserNotesTable.id,
			title: UserNotesTable.title,
			createdAt: UserNotesTable.createdAt,
			tagName: UserTagTable.tagName,
		})
		.from(UserNotesTable)
		.innerJoin(NoteTagTable, eq(NoteTagTable.noteId, UserNotesTable.id))
		.innerJoin(UserTagTable, eq(UserTagTable.id, NoteTagTable.tagId))
		.where(
			and(
				eq(UserNotesTable.userId, userId),
				q ? ilike(UserNotesTable.title, `%${q}%`) : undefined,
				archived === "true" ? eq(UserNotesTable.isArchived, true) : undefined,
				tag ? eq(UserTagTable.tagName, tag.toLowerCase()) : undefined,
			),
		)
		.orderBy(desc(UserNotesTable.createdAt));

	const rows = await qb;
	const map = new Map<
		string,
		{
			id: string;
			title: string;
			createdAt: Date;
			noteTags: Array<{
				tag: { tagName: string };
			}>;
		}
	>();

	rows.forEach((row) => {
		let note = map.get(row.id);
		if (!note) {
			note = {
				id: row.id,
				title: row.title,
				createdAt: row.createdAt,
				noteTags: [],
			};
			map.set(row.id, note);
		}
		note.noteTags.push({
			tag: { tagName: row.tagName },
		});
	});
	const data = Array.from(map.values());

	data.forEach((note) => {
		cacheTag(getNoteIdTag(note.id));
	});
	return data;
}
