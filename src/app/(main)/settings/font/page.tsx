"use client";

import { CaseSensitive, CaseSensitiveIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { type FontOption, fontOptions, useFont } from "@/hooks/useFont";
import SettingOptions from "../_shared/SettingOptions";

interface FontSettingOption {
	icon: React.ReactNode;
	title: string;
	description: string;
	value: FontOption;
}

export default function ColorSettingsPage() {
	const isMobile = useIsMobile();
	const { font, setFont } = useFont();
	const [selected, setSelected] = useState(font);
	const options: FontSettingOption[] = [
		{
			icon: <CaseSensitive />,
			title: "Sans-Serif",
			description: "Clean and modern, easy to read",
			value: fontOptions[0],
		},
		{
			icon: <CaseSensitiveIcon />,
			title: "Monospace",
			description: "Code-like, great for technical vibe.",
			value: fontOptions[1],
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
				<p className="font-bold text-base/[1.2]">Font Theme</p>
				<p className="text-sm/[1.2] text-muted-foreground">
					Choose your font theme:
				</p>
			</div>
			<SettingOptions
				options={options}
				defaultValue={font}
				onValueChange={(e: FontOption) => setSelected(e)}
				className="w-lg data-[mobile=true]:w-full"
				data-mobile={isMobile}
			/>
			<Button
				onClick={() => {
					setFont(selected);
					toast.success("Settings Applied");
				}}
			>
				Apply Changes
			</Button>
		</main>
	);
}
