import { and, eq, ilike } from "drizzle-orm/sql";
import { PlusIcon } from "lucide-react";
import { cacheTag } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import type z from "zod";
import MobileWrapper from "@/components/MobileWrapper";
import { db } from "@/drizzle/db";
import { UserNotesTable } from "@/drizzle/schema";
import { searchNoteSchema } from "@/features/notes/actions/schemas";
import Sidebar from "@/features/notes/components/Sidebar";
import { getNotesUserTag } from "@/features/notes/db/cache/notes";
import SearchBar from "@/features/search/components/SearchBar";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";

const SearchPage = ({ searchParams }: PageProps<"/search">) => {
	return (
		<MobileWrapper visible navigate="/notes">
			<div className="flex-1 pt-6 px-8 flex-col gap-y-4 flex relative">
				<h1 className="text-2xl/[1.2] font-bold tracking-tight">Search</h1>
				<Suspense>
					<SuspendedPage searchParams={searchParams} />
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
};

async function SuspendedPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const [userData, params] = await Promise.all([
		getCurrentUser(),
		searchParams,
	]);

	const { userId } = userData;
	if (!userId) redirect("/sign-in");
	const { success, data } = searchNoteSchema.safeParse(params);
	const search = success ? data : {};
	const userNotes = await getUserNotes(userId, search);
	return (
		<>
			<SearchBar navigate={"/search"} />
			{search.q && (
				<p className="text-sm/[1.2] text-muted-foreground">
					All notes matching "{search.q}" are displayed below.
				</p>
			)}
			<Sidebar notes={userNotes} />
		</>
	);
}

async function getUserNotes(
	userId: string,
	params: z.infer<typeof searchNoteSchema>,
) {
	"use cache";
	cacheTag(getNotesUserTag(userId));
	const { q } = params;
	const filters = [eq(UserNotesTable.userId, userId)];
	if (q) {
		filters.push(ilike(UserNotesTable.title, `%${q}%`));
	}
	return db.query.UserNotesTable.findMany({
		where: and(...filters),
		with: {
			noteTags: {
				with: {
					tag: {
						columns: {
							tagName: true,
						},
					},
				},
				columns: {},
			},
		},
		columns: {
			title: true,
			id: true,
			createdAt: true,
		},
	});
}

export default SearchPage;
