import { useEffect, useState } from "react";
export const themeOptions = ["light", "dark", "system"] as const;
export type ThemeOption = (typeof themeOptions)[number];

const getInitialTheme = () => {
	if (typeof window === "undefined") {
		return "system";
	}
	const storedTheme = localStorage.getItem("theme");
	if (storedTheme === "dark" || storedTheme === "light") {
		return storedTheme;
	}
	return "system";
};

export function useTheme() {
	const [theme, setTheme] = useState<ThemeOption>(getInitialTheme);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const root = document.body;
		const systemThemeHandler = (e: MediaQueryListEvent) => {
			root.classList.toggle("dark", e.matches);
		};
		if (theme === "dark") {
			root.classList.add("dark");
			localStorage.setItem("theme", "dark");
			mediaQuery.removeEventListener("change", systemThemeHandler);
		} else if (theme === "light") {
			root.classList.remove("dark");
			localStorage.setItem("theme", "light");
			mediaQuery.removeEventListener("change", systemThemeHandler);
		} else {
			localStorage.removeItem("theme");
			if (mediaQuery.matches) {
				root.classList.add("dark");
			} else {
				root.classList.remove("dark");
			}
			mediaQuery.addEventListener("change", systemThemeHandler);
		}
		return () => {
			mediaQuery.removeEventListener("change", systemThemeHandler);
		};
	}, [theme]);

	return { theme, setTheme };
}
