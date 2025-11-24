import { eq } from "drizzle-orm/sql";
import { ArchiveIcon, HomeIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { Suspense } from "react";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarNavMenuGroup } from "@/components/sidebar/SidebarNavMenuGroup";
import SidebarTagMenuGroup from "@/components/sidebar/SidebarTagMenuGroup";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { db } from "@/drizzle/db";
import { UserTagTable } from "@/drizzle/schema";
import { getTagsUserTag } from "@/features/tags/db/cache/tags";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";
import { SidebarUserButton } from "../../features/users/components/SidebarUserButton";

export default function MainLayout({ children }: LayoutProps<"/">) {
	return (
		<AppSidebar
			content={
				<>
					<Suspense>
						<SidebarNavMenuGroup
							items={[
								{
									href: "/notes",
									icon: (
										<HomeIcon
											className={"group-data-[active=true]:stroke-blue-500"}
										/>
									),
									label: "All Notes",
									checkerfnType: "notes",
								},
								{
									href: "/notes?archived=true",
									icon: (
										<ArchiveIcon
											className={"group-data-[active=true]:stroke-blue-500"}
										/>
									),
									label: "Archived Notes",
									checkerfnType: "notes",
								},
							]}
						/>
					</Suspense>
					<SidebarSeparator />
					<Suspense>
						<SuspendedTagsMenu />
					</Suspense>
				</>
			}
			footerButton={<SidebarUserButton />}
		>
			{children}
		</AppSidebar>
	);
}

async function SuspendedTagsMenu() {
	const { userId } = await getCurrentUser();
	if (!userId) return null;
	const tags = await getUserTags(userId);
	return <SidebarTagMenuGroup tags={tags} className="py-0" />;
}

async function getUserTags(userId: string) {
	"use cache";
	cacheTag(getTagsUserTag(userId));
	const data = await db.query.UserTagTable.findMany({
		where: eq(UserTagTable.userId, userId),
		columns: {
			tagName: true,
			id: true,
		},
	});
	return data;
}
