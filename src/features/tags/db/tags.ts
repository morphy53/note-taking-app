import { db } from "@/drizzle/db";
import { UserTagTable } from "@/drizzle/schema";
import { revalidateTagCache } from "./cache/tags";

export async function insertTag(
	tag: Omit<typeof UserTagTable.$inferInsert, "id" | "createdAt">,
) {
	const [newNote] = await db
		.insert(UserTagTable)
		.values(tag)
		.onConflictDoNothing()
		.returning({
			id: UserTagTable.id,
			userId: UserTagTable.userId,
		});

	revalidateTagCache(newNote);

	return newNote;
}
