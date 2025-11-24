export function dateFormatter(input: Date) {
	const date = new Date(input);
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}
