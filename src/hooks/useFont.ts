import { useEffect, useState } from "react";
export const fontOptions = ["sans", "mono"] as const;
export type FontOption = (typeof fontOptions)[number];

const getInitialFont = () => {
	if (typeof window === "undefined") {
		return "sans";
	}
	const storedTheme = localStorage.getItem("font");
	if (storedTheme === "mono" || storedTheme === "sans") {
		return storedTheme;
	}
	return "sans";
};

export function useFont() {
	const [font, setFont] = useState<FontOption>(getInitialFont);

	useEffect(() => {
		const root = document.body;
		fontOptions.forEach((option) => {
			root.classList.remove(`font-${option}`);
		});
		if (font === "sans") {
			root.classList.add("font-sans");
			localStorage.setItem("font", "sans");
		}
		if (font === "mono") {
			root.classList.add("font-mono");
			localStorage.setItem("font", "mono");
		}
	}, [font]);

	return { font, setFont };
}
