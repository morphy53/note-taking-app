"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
	type ReadonlyURLSearchParams,
	usePathname,
	useSearchParams,
} from "next/navigation";
import type { ReactNode } from "react";
import { SignedIn, SignedOut } from "@/services/clerk/components/SignInStatus";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";

const checkerfnType = ["notes", "settings"] as const;
type CheckerFnType = (typeof checkerfnType)[number];

export function SidebarNavMenuGroup({
	items,
	className,
}: {
	items: {
		href: string;
		icon: ReactNode;
		label: string;
		checkerfnType: CheckerFnType;
		authStatus?: "signedOut" | "signedIn";
	}[];
	className?: string;
}) {
	const pathname = usePathname();
	const params = useSearchParams();
	return (
		<SidebarGroup className={className}>
			<SidebarMenu>
				{items.map((item) => {
					const html = (
						<SidebarMenuItem key={item.href}>
							<SidebarMenuButton
								asChild
								isActive={getCheckerFn(item.checkerfnType)(
									item.href,
									pathname,
									params,
								)}
							>
								<Link href={item.href} className="group">
									{item.icon}
									<span>{item.label}</span>
									<ChevronRight className="ml-auto group-data-[active=true]:block hidden group-hover:block" />
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);

					if (item.authStatus === "signedOut") {
						return <SignedOut key={item.href}>{html}</SignedOut>;
					}

					if (item.authStatus === "signedIn") {
						return <SignedIn key={item.href}>{html}</SignedIn>;
					}

					return html;
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}

type CheckerFn = (
	href: string,
	pathname: string,
	params: ReadonlyURLSearchParams,
) => boolean;

function getCheckerFn(checkerfnType: CheckerFnType): CheckerFn {
	switch (checkerfnType) {
		case "notes":
			return isActiveNotes;
		case "settings":
			return isActiveSettings;
		default:
			throw new Error(
				`Unknown checkerfnType: ${checkerfnType satisfies never}`,
			);
	}
}

function isActiveNotes(
	href: string,
	pathname: string,
	params: ReadonlyURLSearchParams,
) {
	const root = getRoot(pathname);
	const path =
		params.get("archived") === "true"
			? `${root}?archived=${params.get("archived")}`
			: root;
	return href === path;
}

function isActiveSettings(
	href: string,
	pathname: string,
	_params: ReadonlyURLSearchParams,
) {
	return href === pathname;
}

function getRoot(url: string) {
	const parts = url.split("/");
	return `/${parts[1] || ""}`;
}
