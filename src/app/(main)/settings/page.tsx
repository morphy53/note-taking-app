import MobileWrapper from "@/components/MobileWrapper";
import SettingsNavMenu from "@/features/settings/components/SettingsNavMenu";

export default function SettingsPage() {
	return (
		<MobileWrapper visible>
			<div className="flex-1 pt-6 px-8 flex-col gap-y-4 flex">
				<h1 className="text-2xl/[1.2] font-bold tracking-tight">Settings</h1>
				<SettingsNavMenu className="p-0" />
			</div>
		</MobileWrapper>
	);
}
