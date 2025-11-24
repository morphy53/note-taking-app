import { revalidateTag } from "next/cache";
import { getGlobalTag, getIdTag, getUserTag } from "@/lib/dataCache";

export function getTagsGlobalTag() {
	return getGlobalTag("tags");
}

export function getTagsUserTag(userId: string) {
	return getUserTag("tags", userId);
}

export function getTagIdTag(id: string) {
	return getIdTag("tags", id);
}

export function revalidateTagCache({
	id,
	userId,
}: {
	id: string;
	userId: string;
}) {
	revalidateTag(getTagsGlobalTag());
	revalidateTag(getTagsUserTag(userId));
	revalidateTag(getTagIdTag(id));
}
