import { eq } from "drizzle-orm/sql";
import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import MobileWrapper from "@/components/MobileWrapper";
import { db } from "@/drizzle/db";
import { UserTagTable } from "@/drizzle/schema";
import TagList from "@/features/tags/components/TagList";
import { getTagsUserTag } from "@/features/tags/db/cache/tags";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";

const TagsPage = () => {
	return (
		<MobileWrapper visible navigate="/notes">
			<div className="flex-1 pt-6 px-8 flex-col gap-y-4 flex">
				<h1 className="text-2xl/[1.2] font-bold tracking-tight">Tags</h1>
				<Suspense>
					<SuspendedTags />
				</Suspense>
			</div>
		</MobileWrapper>
	);
};

async function SuspendedTags() {
	const { userId } = await getCurrentUser();
	if (!userId) {
		redirect("/sign-in");
	}
	const userTags = await getUserTags(userId);
	return <TagList tags={userTags} />;
}

export default TagsPage;

async function getUserTags(userId: string) {
	"use cache";
	cacheTag(getTagsUserTag(userId));
	const data = await db.query.UserTagTable.findMany({
		where: eq(UserTagTable.userId, userId),
		columns: {
			tagName: true,
			id: true,
		},
	});
	return data;
}
