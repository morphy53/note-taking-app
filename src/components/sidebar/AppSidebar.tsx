import { AppSidebarClient } from "@/components/sidebar/_AppSidebarClient";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavbarUserButton } from "@/features/users/components/NavbarUserButton";
import { SignedIn } from "@/services/clerk/components/SignInStatus";

export function AppSidebar({
	content,
	footerButton,
	children,
}: {
	content: React.ReactNode;
	footerButton: React.ReactNode;
	children?: React.ReactNode;
}) {
	return (
		<SidebarProvider className="overflow-y-hidden">
			<AppSidebarClient navbarUserButton={<NavbarUserButton />}>
				<Sidebar collapsible="icon" className="overflow-hidden">
					<SidebarHeader className="flex-row">
						<SidebarTrigger />
						<span className="text-2xl text-nowrap font-pacifico font-bold">
							Notes
						</span>
					</SidebarHeader>
					<SidebarContent>{content}</SidebarContent>
					<SignedIn>
						<SidebarFooter>
							<SidebarMenu>
								<SidebarMenuItem>{footerButton}</SidebarMenuItem>
							</SidebarMenu>
						</SidebarFooter>
					</SignedIn>
				</Sidebar>
				<main className="flex-1 flex">{children}</main>
			</AppSidebarClient>
		</SidebarProvider>
	);
}
