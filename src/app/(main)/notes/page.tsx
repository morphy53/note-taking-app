import { and, desc, eq } from "drizzle-orm/sql";
import { PlusIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import type z from "zod";
import MobileWrapper from "@/components/MobileWrapper";
import { db } from "@/drizzle/db";
import { NoteTagTable, UserNotesTable, UserTagTable } from "@/drizzle/schema";
import { searchNoteSchema } from "@/features/notes/actions/schemas";
import MessageBox from "@/features/notes/components/MessageBox";
import Sidebar from "@/features/notes/components/Sidebar";
import { getNoteIdTag, getNotesUserTag } from "@/features/notes/db/cache/notes";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";

export default function NotesPage({ searchParams }: PageProps<"/notes">) {
	return (
		<MobileWrapper visible>
			<div className="flex-1 pt-6 px-8 flex-col gap-y-4 flex relative">
				<Suspense>
					<SuspendedNotes searchParams={searchParams} />
				</Suspense>
				<Link
					href={"/notes/new"}
					className="absolute rounded-full bg-blue-500 size-12 flex items-center justify-center z-10 right-8 bottom-6"
				>
					<PlusIcon className="text-white" />
				</Link>
			</div>
		</MobileWrapper>
	);
}

const SuspendedNotes = async ({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
	const { userId } = await getCurrentUser();
	if (!userId) redirect("/sign-in");
	const params = await searchParams;
	const { success, data } = searchNoteSchema.safeParse(params);
	const search = success ? data : {};
	const notes = await getUserNotes(userId, search);
	return (
		<>
			<h1 className="text-2xl/[1.2] font-bold tracking-tight">
				{search.archived === "true" ? "All Archived" : "All Notes"}
			</h1>
			<MessageBox noteCount={notes.length} search={search} />
			<Sidebar notes={notes} />
		</>
	);
};

async function getUserNotes(
	userId: string,
	params: z.infer<typeof searchNoteSchema>,
) {
	"use cache";
	cacheTag(getNotesUserTag(userId));

	const { tag, archived } = params;

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
