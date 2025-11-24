import { revalidateTag } from "next/cache";
import { getGlobalTag, getIdTag, getUserTag } from "@/lib/dataCache";

export function getNoteGlobalTag() {
	return getGlobalTag("notes");
}

export function getNotesUserTag(userId: string) {
	return getUserTag("notes", userId);
}

export function getNoteIdTag(id: string) {
	return getIdTag("notes", id);
}

export function revalidateNoteCache({
	id,
	userId,
}: {
	id: string;
	userId: string;
}) {
	// @ts-expect-error
	revalidateTag(getNoteGlobalTag());
	// @ts-expect-error
	revalidateTag(getNotesUserTag(userId));
	// @ts-expect-error
	revalidateTag(getNoteIdTag(id));
}
