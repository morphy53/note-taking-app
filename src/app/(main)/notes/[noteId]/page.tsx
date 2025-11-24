import { and, eq } from "drizzle-orm/sql";
import {
	ArchiveIcon,
	ArchiveRestoreIcon,
	Edit,
	EditIcon,
	Tag,
	Trash,
	Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ActionButton } from "@/components/ActionButton";
import BackButton from "@/components/BackButton";
import MobileWrapper from "@/components/MobileWrapper";
import { MarkdownPartial } from "@/components/markdown/MarkdownPartial";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/drizzle/db";
import { UserNotesTable } from "@/drizzle/schema";
import {
	deleteUserNote,
	updateNoteArchivalStatus,
} from "@/features/notes/actions/actions";
import { dateFormatter } from "@/features/notes/lib/formatter";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";

export default function NotePage({ params }: PageProps<"/notes/[noteId]">) {
	return (
		<main className="flex-1 py-5 px-6 flex flex-col gap-y-3">
			<Suspense>
				<SuspendedNotes params={params} />
			</Suspense>
		</main>
	);
}

async function SuspendedNotes({
	params,
}: {
	params: Promise<{ noteId: string }>;
}) {
	const [userData, paramsData] = await Promise.all([getCurrentUser(), params]);
	const { userId } = userData;
	const { noteId } = paramsData;
	if (!userId) return;
	const userNote = await getUserNote({ userId, noteId });
	if (!userNote) return notFound();
	return (
		<>
			<MobileWrapper visible>
				<div className="flex gap-4">
					<BackButton />
					<Button asChild className="ml-auto">
						<Link href={`/notes/edit/${noteId}`}>
							<EditIcon />
						</Link>
					</Button>
					<Button
						variant={"outline"}
						onClick={updateNoteArchivalStatus.bind(
							null,
							noteId,
							!userNote.isArchived,
						)}
					>
						{userNote.isArchived ? <ArchiveRestoreIcon /> : <ArchiveIcon />}
					</Button>
					<ActionButton
						variant={"destructive"}
						requireAreYouSure
						areYouSureDescription="Are you sure to delete this note"
						action={deleteUserNote.bind(null, noteId)}
						areYouSureTitle="Delete Note"
						displyIcon={<Trash2Icon className="size-5" />}
					>
						<Trash />
					</ActionButton>
				</div>
				<Separator />
			</MobileWrapper>
			<h1 className="text-2xl font-bold">{userNote.title}</h1>
			<div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-xs/[1.2]">
				<div className="flex gap-1 items-center text-muted-foreground">
					<Tag className="size-3 align-bottom" />
					Tags
				</div>
				<div>{userNote.noteTags.map((el) => el.tag.tagName).join(", ")}</div>
				<div className="flex gap-1 items-center text-muted-foreground">
					<Edit className="size-3 align-bottom" />
					Last edited
				</div>
				<div>{dateFormatter(userNote.updatedAt)}</div>
			</div>
			<Separator />
			<div className="flex flex-1 overflow-y-scroll">
				<MarkdownPartial
					dialogMarkdown={<MarkdownRenderer source={userNote.content} />}
					mainMarkdown={
						<MarkdownRenderer className="prose-sm" source={userNote.content} />
					}
					dialogTitle="Description"
				/>
			</div>
			<MobileWrapper>
				<Separator />
				<div className="flex gap-x-3">
					<Button asChild>
						<Link href={`/notes/edit/${noteId}`}>Edit Note</Link>
					</Button>
					<Button
						variant={"outline"}
						onClick={updateNoteArchivalStatus.bind(
							null,
							noteId,
							!userNote.isArchived,
						)}
					>
						{userNote.isArchived ? "Restore" : "Archive"}
					</Button>
					<ActionButton
						variant={"destructive"}
						requireAreYouSure
						areYouSureDescription="Are you sure to delete this note"
						action={deleteUserNote.bind(null, noteId)}
						areYouSureTitle="Delete Note"
						displyIcon={<Trash2Icon className="size-5" />}
					>
						Delete
					</ActionButton>
				</div>
			</MobileWrapper>
		</>
	);
}

async function getUserNote({
	userId,
	noteId,
}: {
	userId: string;
	noteId: string;
}) {
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
				columns: {},
			},
		},
		columns: {
			title: true,
			id: true,
			updatedAt: true,
			content: true,
			isArchived: true,
		},
	});
}
