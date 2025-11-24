import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import type React from "react";
import MobileWrapper from "@/components/MobileWrapper";
import SearchBar from "@/features/search/components/SearchBar";
import { Button } from "../../../components/ui/button";
import MainContainerTitle from "./MainContainerTitle";

const MainContainer = ({
	children,
	sidebar,
}: {
	children: React.ReactNode;
	sidebar: React.ReactNode;
}) => {
	return (
		<div className="flex-1 size-full flex flex-col">
			<MobileWrapper>
				<div className="flex justify-between px-8 py-6 items-center border-b">
					<MainContainerTitle />
					<div className="flex gap-4 items-center">
						<SearchBar navigate="/notes" />
						<Button variant={"ghost"} asChild>
							<Link href={"/settings"}>
								<SettingsIcon className="text-muted-foreground stroke-current size-5" />
							</Link>
						</Button>
					</div>
				</div>
			</MobileWrapper>
			<div className="flex-1 flex">
				<MobileWrapper>{sidebar}</MobileWrapper>
				{children}
			</div>
		</div>
	);
};

export default MainContainer;
