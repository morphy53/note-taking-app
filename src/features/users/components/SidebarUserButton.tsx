import { ChevronsUpDown, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";
import { UserDropdownClient } from "./_UserDropdownClient";
import { UserAvatar } from "./UserAvatar";

export function SidebarUserButton() {
	return (
		<Suspense>
			<SidebarUserFetch />
		</Suspense>
	);
}

async function SidebarUserFetch() {
	const { user } = await getCurrentUser({ allData: true });

	if (!user) {
		return (
			<SignOutButton redirectUrl="/sign-in">
				<SidebarMenuButton asChild>
					<Link href="/sign-in">
						<LogOutIcon /> Log Out
					</Link>
				</SidebarMenuButton>
			</SignOutButton>
		);
	}

	return (
		<UserDropdownClient
			user={user}
			trigger={
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="flex items-center gap-2 overflow-hidden">
						<UserAvatar
							name={user.name}
							imageUrl={user.imageUrl}
							className="size-8 rounded-lg"
						/>
						<div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]:hidden">
							<span className="truncate text-sm font-semibold">
								{user.name}
							</span>
							<span className="truncate text-xs">{user.email}</span>
						</div>
					</div>
					<ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden" />
				</SidebarMenuButton>
			}
		/>
	);
}
