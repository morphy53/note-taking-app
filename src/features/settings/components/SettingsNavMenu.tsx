import { LucideALargeSmall, Sun } from "lucide-react";
import { SidebarNavMenuGroup } from "@/components/sidebar/SidebarNavMenuGroup";

const SettingsNavMenu = ({ className }: { className?: string }) => {
	return (
		<SidebarNavMenuGroup
			className={className}
			items={[
				{
					href: "/settings/color",
					icon: (
						<Sun
							className={"group-data-[active=true]/menuButton:stroke-blue-500"}
						/>
					),
					label: "Color Theme",
					checkerfnType: "settings",
				},
				{
					href: "/settings/font",
					icon: (
						<LucideALargeSmall
							className={"group-data-[active=true]/menuButton:stroke-blue-500"}
						/>
					),
					label: "Font Theme",
					checkerfnType: "settings",
				},
			]}
		/>
	);
};

export default SettingsNavMenu;
