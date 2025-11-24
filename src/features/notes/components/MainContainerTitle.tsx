"use client";

import { useSearchParams } from "next/navigation";

const MainContainerTitle = () => {
	const params = useSearchParams();
	if (params.get("search")) {
		return (
			<p className="text-2xl/[1.2] font-bold tracking-tight">
				<span className="text-neutral-600">Showing results for: </span>
				<span>{params.get("q")}</span>
			</p>
		);
	}
	if (params.get("tag")) {
		return (
			<p className="text-2xl/[1.2] font-bold tracking-tight">
				<span className="text-neutral-600">Notes Tagged: </span>
				<span>{params.get("tag")}</span>
			</p>
		);
	}
	if (params.get("archived") === "true") {
		return (
			<span className="text-2xl/[1.2] font-bold tracking-tight">
				Archived Notes
			</span>
		);
	}
	return (
		<span className="text-2xl/[1.2] font-bold tracking-tight">All Notes</span>
	);
};

export default MainContainerTitle;
