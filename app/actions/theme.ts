"use server";

import { Theme } from "@/lib/ui.store";
import { cookies } from "next/headers";

export async function setTheme(theme: Theme) {
	(await cookies()).set("theme", theme, {
		path: "/",
		maxAge: 31536000,
		httpOnly: false,
	});
}
