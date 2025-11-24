"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, SaveIcon, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import BackButton from "@/components/BackButton";
import MobileWrapper from "@/components/MobileWrapper";
import { MarkdownEditor } from "@/components/markdown/MarkdownEditor";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import type { UserNotesTable } from "@/drizzle/schema";
import { createUserNote, updateUserNote } from "../actions/actions";
import { notesSchema } from "../actions/schemas";
import { dateFormatter } from "../lib/formatter";

export const NotesForm = ({
	note,
}: {
	note?: Omit<typeof UserNotesTable.$inferSelect, "createdAt"> & {
		tags: string;
	};
}) => {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(notesSchema),
		defaultValues: note ?? {
			title: "",
			tags: "",
			content: "",
		},
	});
	async function onSubmit(data: z.infer<typeof notesSchema>) {
		const action = note ? updateUserNote.bind(null, note.id) : createUserNote;
		const res = await action(data);
		if (res.error) {
			toast.error(res.message ?? "There was an error");
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex-1 py-5 px-6 flex flex-col gap-y-3"
			>
				<MobileWrapper visible>
					<div className="flex justify-between">
						<BackButton />
						<Button
							disabled={form.formState.isSubmitting}
							type="submit"
							className="bg-blue-500"
						>
							<SaveIcon />
						</Button>
					</div>
					<Separator />
				</MobileWrapper>
				<FormField
					name="title"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<input
									{...field}
									placeholder="Enter a title..."
									className="leading-[1.2] placeholder:text-muted-foreground placeholder:text-xl placeholder:font-semibold font-bold text-2xl selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full rounded-sm bg-transparent outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
								/>
							</FormControl>
							<FormMessage className="text-xs/[1.2]" />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-xs/[1.2]">
					<div className="flex gap-1 text-muted-foreground items-start">
						<Tag className="size-3 align-bottom" />
						Tags
					</div>
					<FormField
						name="tags"
						control={form.control}
						render={({ field }) => (
							<FormItem className="gap-1">
								<FormControl>
									<input
										{...field}
										placeholder="Add tags separated by commas (eg: Work, Plan)"
										className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full rounded-xs bg-transparent outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
									/>
								</FormControl>
								<FormMessage className="text-xs/[1.2]" />
							</FormItem>
						)}
					/>
					<div className="flex gap-1 items-center text-muted-foreground">
						<Edit className="size-3 align-bottom" />
						Last edited
					</div>
					<div>
						{note?.updatedAt ? dateFormatter(note.updatedAt) : "Not yet saved"}
					</div>
				</div>
				<Separator />
				<FormField
					name="content"
					control={form.control}
					render={({ field }) => (
						<FormItem className="flex-1 flex flex-col">
							<FormControl>
								<MarkdownEditor
									className="flex-1 flex flex-col"
									{...field}
									markdown={field.value ?? ""}
								/>
							</FormControl>
							<FormMessage className="text-xs/[1.2]" />
						</FormItem>
					)}
				/>
				<MobileWrapper>
					<Separator />
					<div className="flex gap-x-3">
						<Button
							disabled={form.formState.isSubmitting}
							type="submit"
							className="bg-blue-500"
						>
							Save Note
						</Button>
						<Button
							variant={"outline"}
							type="button"
							onClick={() => router.back()}
						>
							Cancel
						</Button>
					</div>
				</MobileWrapper>
			</form>
		</Form>
	);
};

export default NotesForm;
