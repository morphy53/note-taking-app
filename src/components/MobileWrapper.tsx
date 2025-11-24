"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileWrapper = ({
	children,
	visible,
	navigate,
}: {
	children: React.ReactNode;
	navigate?: string;
	visible?: boolean;
}) => {
	const isMobile = useIsMobile();
	const router = useRouter();
	useEffect(() => {
		if (navigate && !isMobile) {
			router.replace(navigate);
		}
	}, [navigate, isMobile, router]);
	return (
		<div
			className={
				visible
					? "hidden data-[mobile=true]:contents"
					: "contents data-[mobile=true]:hidden"
			}
			data-mobile={isMobile}
		>
			{children}
		</div>
	);
};

export default MobileWrapper;
