"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { UserAvatar } from "./UserAvatar";

type User = {
	name: string;
	imageUrl: string;
	email: string;
};

export function UserDropdownClient({
	user,
	trigger,
}: {
	user: User;
	trigger: React.ReactNode; // the clickable UI that opens dropdown
}) {
	const isMobile = useIsMobile();
	const { openUserProfile } = useClerk();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				side={isMobile ? "bottom" : "right"}
				className="min-w-64 max-w-80"
			>
				<DropdownMenuLabel className="font-normal p-1">
					<div className="flex items-center gap-2">
						<UserAvatar
							name={user.name}
							imageUrl={user.imageUrl}
							className="size-8"
						/>
						<div className="flex flex-col">
							<span className="font-semibold text-sm">{user.name}</span>
							<span className="text-xs truncate">{user.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={() => {
						openUserProfile();
					}}
				>
					<UserIcon className="mr-1" /> Profile
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<SignOutButton redirectUrl="/sign-in">
					<DropdownMenuItem asChild>
						<Link href={"/sign-in"}>
							<LogOutIcon className="mr-1" /> Log Out
						</Link>
					</DropdownMenuItem>
				</SignOutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
