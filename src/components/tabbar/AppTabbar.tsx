"use client";

import {
	ArchiveIcon,
	HomeIcon,
	SearchIcon,
	SettingsIcon,
	TagIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";

function AppTabbar() {
	const pathname = getRoot(usePathname());
	const params = useSearchParams();
	const path =
		params.get("archived") === "true"
			? `${pathname}?archived=${params.get("archived")}`
			: pathname;
	const items = [
		{
			href: "/notes",
			icon: <HomeIcon className={"group-data-active:stroke-blue-500 size-4"} />,
			label: "Home",
		},
		{
			href: "/notes?archived=true",
			icon: (
				<ArchiveIcon className={"group-data-active:stroke-blue-500 size-4"} />
			),
			label: "Archived",
		},
		{
			href: "/settings",
			icon: (
				<SettingsIcon className={"group-data-active:stroke-blue-500 size-4"} />
			),
			label: "Settings",
		},
		{
			href: "/tags",
			icon: <TagIcon className={"group-data-active:stroke-blue-500 size-4"} />,
			label: "Tags",
		},
		{
			href: "/search",
			icon: (
				<SearchIcon className={"group-data-active:stroke-blue-500 size-4"} />
			),
			label: "Search",
		},
	];
	return (
		<div>
			<NavigationMenu className="border-t block shadow-2xl shadow-gray-900">
				<NavigationMenuList className="gap-0 items-stretch justify-between px-5 py-2">
					{items.map((item, index) => (
						<React.Fragment key={item.label}>
							<NavigationMenuItem asChild className="flex-1">
								<NavigationMenuLink
									asChild
									active={path === item.href}
									className={navigationMenuTriggerStyle()}
								>
									<Link href={item.href} className="flex-col gap-0.5">
										{item.icon}
										<span className="hidden text-xs/[1.2] tracking-tighter text-muted-foreground sm:block group-data-active:text-blue-500">
											{item.label}
										</span>
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							{index < items.length - 1 && (
								<div className="hidden justify-center xs:flex shrink grow">
									<Separator orientation="vertical" />
								</div>
							)}
						</React.Fragment>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}

export default AppTabbar;

function getRoot(url: string) {
	const parts = url.split("/");
	return `/${parts[1] || ""}`;
}
