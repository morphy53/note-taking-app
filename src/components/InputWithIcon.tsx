import type React from "react";
import { cn } from "@/lib/utils";

type IconComponentProps = {
	className: string;
};
type IconType = React.ComponentType<IconComponentProps>;

const InputWithIcon = ({
	placeholder,
	value,
	onChange,
	Icon,
	className,
	type,
	...props
}: React.ComponentProps<"input"> & { Icon: IconType }) => (
	<div className="relative w-full">
		<Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
		<input
			type={type}
			data-slot="input"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={cn(
				`
        flex h-10 w-full rounded-md border border-input bg-background 
        pl-9 pr-4 py-2 text-sm 
        ring-offset-background 
        placeholder:text-muted-foreground 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50
        transition-colors
      `,
				className,
			)}
			{...props}
		/>
	</div>
);

export default InputWithIcon;
