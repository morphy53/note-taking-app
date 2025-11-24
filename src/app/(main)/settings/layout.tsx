import { Suspense } from "react";
import MainContainer from "@/features/settings/components/MainContainer";

export default function SettingsLayout({
	children,
	sidebar,
}: LayoutProps<"/settings">) {
	return (
		<Suspense>
			<MainContainer sidebar={sidebar}>{children}</MainContainer>
		</Suspense>
	);
}
