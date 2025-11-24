import type z from "zod";
import type { searchNoteSchema } from "../actions/schemas";

const MessageBox = ({
	noteCount,
	search,
}: {
	noteCount: number;
	search: z.infer<typeof searchNoteSchema>;
}) => {
	return (
		<>
			{MessageSelector(search)}
			{noteCount === 0 && EmptyMessage(search.archived)}
		</>
	);
};

export default MessageBox;

function MessageSelector(search: z.infer<typeof searchNoteSchema>) {
	if (search.q) {
		return (
			<p className="text-sm/[1.2] text-muted-foreground">
				All notes matching "{search.q}" are displayed below.
			</p>
		);
	}
	if (search.tag) {
		return (
			<p className="text-sm/[1.2] text-muted-foreground">
				All {search.archived === "true" ? "archived notes" : "notes"} with "
				{search.tag}" tag are displayed here.
			</p>
		);
	}
	if (search.archived === "true") {
		return (
			<p className="text-sm/[1.2] text-muted-foreground">
				All your archived notes are stored here.
			</p>
		);
	}
}

function EmptyMessage(archived: string | undefined) {
	if (archived === "true") {
		return (
			<div className="text-sm/[1.2] p-2 border rounded-sm bg-muted">
				No notes have been archived yet. Move notes here for safekeeping.
			</div>
		);
	}
	return (
		<div className="text-sm/[1.2] p-2 border rounded-sm bg-muted">
			You don't have any notes yet. Start a new note to capture your thoughts
			and ideas.
		</div>
	);
}
