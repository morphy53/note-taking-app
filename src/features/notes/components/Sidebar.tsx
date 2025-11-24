"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { UserNotesTable, UserTagTable } from "@/drizzle/schema";

type Note = Pick<
	typeof UserNotesTable.$inferSelect,
	"title" | "id" | "createdAt"
> & {
	noteTags: {
		tag: Pick<typeof UserTagTable.$inferSelect, "tagName">;
	}[];
};

const Sidebar = ({ notes }: { notes: Note[] }) => {
	const pathname = usePathname();
	const currentId = pathname.split("/").at(-1);
	return (
		<div className="flex flex-col gap-y-1">
			{notes.map((item, index) => (
				<React.Fragment key={item.id}>
					<Link
						href={`/notes/${item.id}`}
						data-active={item.id === currentId}
						className="group"
					>
						<Card className="p-2 gap-3 rounded-lg hover:bg-accent border-[#C0D5FF] border-0 group-data-[active=true]:border group-data-[active=true]:bg-accent">
							<CardTitle className="text-base/[1.2] font-semibold tracking-tight">
								{item.title}
							</CardTitle>
							<CardContent className="p-0 flex gap-1 flex-wrap">
								{item.noteTags.map((noteTag) => (
									<Badge
										key={noteTag.tag.tagName}
										className="text-xs/[1.2] rounded-[5] px-1 py-0.5 tracking-tight font-normal"
									>
										{noteTag.tag.tagName}
									</Badge>
								))}
							</CardContent>
							<CardDescription className="text-xs/[1.2] font-normal">
								{new Date(Date.now()).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "short",
									year: "numeric",
								})}
							</CardDescription>
						</Card>
					</Link>
					{index + 1 !== notes.length && <Separator />}
				</React.Fragment>
			))}
		</div>
	);
};

export default Sidebar;
