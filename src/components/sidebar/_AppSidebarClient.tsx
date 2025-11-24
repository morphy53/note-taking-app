"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AppTabbar from "../tabbar/AppTabbar";

export function AppSidebarClient({
	children,
	navbarUserButton,
}: {
	children: ReactNode;
	navbarUserButton: ReactNode;
}) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className="flex flex-col w-full">
				<div className="flex-1 flex flex-col bg-secondary">
					<div className="flex justify-between py-2 px-3">
						<div className="flex gap-x-2">
							<Image
								alt="Feater Image"
								src="/Feather.svg"
								className={"object-contain size-8"}
							/>
							<span className="text-2xl text-nowrap font-pacifico font-bold">
								Notes
							</span>
						</div>
						{navbarUserButton}
					</div>
					<div className="flex-1 flex bg-background rounded-t-xl overflow-hidden">
						{children}
					</div>
				</div>
				<AppTabbar />
			</div>
		);
	}

	return children;
}
