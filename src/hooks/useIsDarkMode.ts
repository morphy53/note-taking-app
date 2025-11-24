import { useEffect, useState } from "react";

export function useIsDarkMode() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const htmlElement = document.documentElement;
		setIsDarkMode(htmlElement.classList.contains("dark"));
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "class"
				) {
					setIsDarkMode(htmlElement.classList.contains("dark"));
				}
			});
		});
		observer.observe(htmlElement, { attributes: true });
		return () => observer.disconnect();
	}, []);
	return isDarkMode;
}
