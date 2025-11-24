import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";
import { UserDropdownClient } from "./_UserDropdownClient";
import { UserAvatar } from "./UserAvatar";

export function NavbarUserButton() {
	return (
		<Suspense>
			<NavbarUserFetch />
		</Suspense>
	);
}

async function NavbarUserFetch() {
	const { user } = await getCurrentUser({ allData: true });

	if (!user) {
		return (
			<SignOutButton redirectUrl="/sign-in">
				<Button asChild variant="outline" className="p-0 h-auto">
					<Link href="/sign-in">
						<LogOutIcon />
					</Link>
				</Button>
			</SignOutButton>
		);
	}

	return (
		<UserDropdownClient
			user={user}
			trigger={
				<button type="button">
					<UserAvatar
						name={user.name}
						imageUrl={user.imageUrl}
						className="rounded-lg h-auto"
					/>
				</button>
			}
		/>
	);
}
