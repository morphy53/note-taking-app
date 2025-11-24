"use client";

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { type ReactNode, Suspense } from "react";
import { useFont } from "@/hooks/useFont";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { useTheme } from "@/hooks/useTheme";

export function ClerkProvider({ children }: { children: ReactNode }) {
	useTheme();
	useFont();
	const isDarkMode = useIsDarkMode();

	return (
		<Suspense>
			<OriginalClerkProvider
				appearance={isDarkMode ? { baseTheme: [dark] } : undefined}
			>
				{children}
			</OriginalClerkProvider>
		</Suspense>
	);
}
