export function splitString(inputString: string, delimiter: string) {
	const lowercasedString = inputString.toLowerCase();
	const resultList = lowercasedString
		.split(delimiter)
		.map((tag) => tag.trim())
		.filter(Boolean);

	return resultList;
}
