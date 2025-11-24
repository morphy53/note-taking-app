"use client";
import { ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import {
	type ReadonlyURLSearchParams,
	usePathname,
	useSearchParams,
} from "next/navigation";
import type { UserTagTable } from "@/drizzle/schema";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";

const SidebarTagMenuGroup = ({
	tags,
	className,
}: {
	tags: Pick<typeof UserTagTable.$inferSelect, "id" | "tagName">[];
	className?: string;
}) => {
	const params = useSearchParams();
	const pathname = usePathname();
	const path = params.get("tag")
		? `${pathname}?tag=${params.get("tag")}`
		: pathname;
	return (
		<SidebarGroup className={className}>
			<SidebarGroupLabel className="h-fit text-xs/[1.2]">
				Tags
			</SidebarGroupLabel>
			<SidebarMenu className="mt-2 group-data-[state=collapsed]:mt-4">
				{tags.map((tag) => (
					<SidebarMenuItem key={tag.id}>
						<SidebarMenuButton
							asChild
							isActive={`/notes?tag=${tag.tagName}` === path}
						>
							<Link
								href={tagMenuHrefConstructor(params, tag.tagName)}
								className="group"
							>
								<Tag className={"group-data-[active=true]:stroke-blue-500"} />
								<span>{tag.tagName}</span>
								<ChevronRight className="ml-auto group-data-[active=true]:block hidden" />
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};

export default SidebarTagMenuGroup;

function tagMenuHrefConstructor(params: ReadonlyURLSearchParams, name: string) {
	return params.get("archived")
		? `/notes?tag=${name}&archived=${params.get("archived")}`
		: `/notes?tag=${name}`;
}
