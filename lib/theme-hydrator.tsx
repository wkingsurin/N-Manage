"use client";

import { useEffect } from "react";
import { Theme, useUIStore } from "./ui.store";

interface IProps {
	theme: Theme;
}

export default function ThemeHydrator({ theme }: IProps) {
	useEffect(() => {
		useUIStore.getState().updateTheme(theme);
	}, [theme]);

	return null;
}
