import { Suspense } from "react";
import MainContainer from "@/features/notes/components/MainContainer";

export default function NotesLayout({
	children,
	sidebar,
}: LayoutProps<"/notes">) {
	return (
		<Suspense>
			<MainContainer sidebar={sidebar}>{children}</MainContainer>
		</Suspense>
	);
}
