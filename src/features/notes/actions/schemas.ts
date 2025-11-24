import { z } from "zod";

export const notesSchema = z.object({
	title: z.string().min(1, "Required").max(100),
	content: z.string().min(1, "Required").max(5000),
	tags: z.string().min(1, "Required").max(100),
});

export const searchNoteSchema = z.object({
	q: z.string().trim().optional(),
	archived: z.preprocess(
		(val) => (typeof val === "string" ? val.trim() : val),
		z.enum(["true"]).optional(),
	),
	tag: z.string().trim().optional(),
});
