"use client";

import { Eclipse, Sun, SunMoon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { type ThemeOption, themeOptions, useTheme } from "@/hooks/useTheme";
import SettingOptions from "../_shared/SettingOptions";

interface ThemeSettingOption {
	icon: React.ReactNode;
	title: string;
	description: string;
	value: ThemeOption;
}

export default function ColorSettingsPage() {
	const isMobile = useIsMobile();
	const { theme, setTheme } = useTheme();
	const [selected, setSelected] = useState(theme);
	const options: ThemeSettingOption[] = [
		{
			icon: <Sun />,
			title: "Light Mode",
			description: "Pick a clean and classic light theme",
			value: themeOptions[0],
		},
		{
			icon: <Eclipse />,
			title: "Dark Mode",
			description: "Select a sleek and modern dark theme",
			value: themeOptions[1],
		},
		{
			icon: <SunMoon />,
			title: "System",
			description: "Adapts to device's theme",
			value: themeOptions[2],
		},
	] as const;
	return (
		<main
			className="p-8 data-[mobile=true]:gap-y-5 data-[mobile=true]:py-6 flex flex-col gap-y-6 items-end data-[mobile=true]:flex-1"
			data-mobile={isMobile}
		>
			<div className="w-full">
				<div
					className="hidden data-[mobile=true]:block mb-3"
					data-mobile={isMobile}
				>
					<BackButton />
				</div>
				<p className="font-bold text-base/[1.2]">Color Theme</p>
				<p className="text-sm/[1.2] text-muted-foreground">
					Choose your color theme:
				</p>
			</div>
			<SettingOptions
				options={options}
				defaultValue={theme}
				onValueChange={(e: ThemeOption) => setSelected(e)}
				className="w-lg data-[mobile=true]:w-full"
				data-mobile={isMobile}
			/>
			<Button
				onClick={() => {
					setTheme(selected);
					toast.success("Settings Applied");
				}}
			>
				Apply Changes
			</Button>
		</main>
	);
}
