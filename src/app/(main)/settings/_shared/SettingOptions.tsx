import type React from "react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SettingOptions = ({
	options,
	...props
}: {
	options: readonly {
		value: string;
		icon: React.ReactNode;
		title: string;
		description: string;
	}[];
} & React.ComponentProps<typeof RadioGroup>) => {
	return (
		<RadioGroup {...props}>
			{options.map((option) => (
				<Card
					key={option.value}
					className="p-4 flex-row items-center gap-x-4 has-[button[data-state='checked']]:bg-accent"
				>
					<div className="flex items-center justify-center size-10 rounded-xl border bg-background">
						{option.icon}
					</div>
					<CardHeader className="p-0 w-full">
						<CardTitle className="text-sm/[1.2] font-semibold">
							{option.title}
						</CardTitle>
						<CardDescription className="text-xs/[1.2]">
							{option.description}
						</CardDescription>
					</CardHeader>
					<RadioGroupItem
						value={option.value}
						className="data-[state=checked]:bg-blue-500 text-background"
					/>
				</Card>
			))}
		</RadioGroup>
	);
};

export default SettingOptions;
