"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import InputWithIcon from "@/components/InputWithIcon";
import { searchNoteSchema } from "@/features/notes/actions/schemas";
import { convertSearchParamsToString } from "@/lib/convertSearchParamsToString";

const SearchBar = ({ navigate }: { navigate: string }) => {
	const router = useRouter();
	const params = useSearchParams();
	const [searchValue, setSearchValue] = useState<string>(params.get("q") ?? "");
	const handleSubmit = () => {
		const { success, data } = searchNoteSchema.safeParse({
			...Object.fromEntries(params),
			q: searchValue,
		});
		router.push(
			`${navigate}?${convertSearchParamsToString(
				success ? data : { q: searchValue.trim() },
			)}`,
		);
	};
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSubmit();
		}
	};
	return (
		<InputWithIcon
			Icon={SearchIcon}
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
			onKeyDown={handleKeyDown}
			placeholder="Search by title"
			type="search"
		/>
	);
};

export default SearchBar;
