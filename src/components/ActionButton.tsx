"use client";

import {
	AlertDialog,
	AlertDialogDescription,
	AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { type ComponentPropsWithRef, useTransition } from "react";
import { toast } from "sonner";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { LoadingSwap } from "./ui/loading-swap";
import { Separator } from "./ui/separator";

export function ActionButton({
	action,
	requireAreYouSure = false,
	areYouSureDescription = "This action cannot be undone.",
	areYouSureTitle,
	displyIcon,
	...props
}: Omit<ComponentPropsWithRef<typeof Button>, "onClick"> & {
	action: () => Promise<{ error: boolean; message?: string }>;
	requireAreYouSure?: boolean;
	areYouSureDescription?: string;
	areYouSureTitle: string;
	displyIcon: React.ReactNode;
}) {
	const [isLoading, startTransition] = useTransition();

	function performAction() {
		startTransition(async () => {
			const data = await action();
			if (data.error) {
				toast.error(data.message ?? "Error");
			}
		});
	}

	if (requireAreYouSure) {
		return (
			<AlertDialog open={isLoading ? true : undefined}>
				<AlertDialogTrigger asChild>
					<Button {...props} />
				</AlertDialogTrigger>
				<AlertDialogContent className="py-5 px-0 gap-y-5">
					<AlertDialogHeader className="flex gap-x-4 flex-row px-5">
						<div className="size-10 bg-secondary rounded-lg flex items-center justify-center">
							{displyIcon}
						</div>
						<div>
							<AlertDialogTitle className="font-semibold text-base/[1.2] text-left">
								{areYouSureTitle}
							</AlertDialogTitle>
							<AlertDialogDescription className="font-normal text-sm/[1.2] text-muted-foreground">
								{areYouSureDescription}
							</AlertDialogDescription>
						</div>
					</AlertDialogHeader>
					<Separator />
					<AlertDialogFooter className="px-5">
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction disabled={isLoading} onClick={performAction}>
							<LoadingSwap isLoading={isLoading}>Yes</LoadingSwap>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	}

	return (
		<Button {...props} disabled={isLoading} onClick={performAction}>
			<LoadingSwap
				isLoading={isLoading}
				className="inline-flex items-center gap-2"
			>
				{props.children}
			</LoadingSwap>
		</Button>
	);
}
