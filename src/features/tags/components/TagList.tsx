import { Tag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import type { UserTagTable } from "@/drizzle/schema";

const TagList = ({
	tags,
}: {
	tags: Pick<typeof UserTagTable.$inferSelect, "id" | "tagName">[];
}) => {
	return (
		<div>
			{tags.map((tag, index) => (
				<React.Fragment key={tag.id}>
					<Link
						href={`/notes?tag=${tag.id}`}
						className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
					>
						<Tag /> {tag.tagName}
					</Link>
					{index + 1 !== tags.length && <Separator />}
				</React.Fragment>
			))}
		</div>
	);
};

export default TagList;
