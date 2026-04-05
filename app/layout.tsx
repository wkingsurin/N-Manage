import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";

import AuthProvider from "@/components/providers/session-provider";

import Header from "@/components/header";
import Overlay from "@/components/shared/Overlay";
import ThemeHydrator from "@/lib/theme-hydrator";
import { Theme } from "@/lib/ui.store";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "700"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "N Manage",
	description: "N Manage",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookiesStore = await cookies();
	const theme = (cookiesStore.get("theme")?.value as Theme) || "light";

	return (
		<html lang="en" className={theme} style={{ colorScheme: theme }}>
			<body className={`${poppins.variable} ${inter.variable} antialiased dark:bg-gloomy`}>
				<AuthProvider>
					<ThemeHydrator theme={theme} />
					<Overlay />
					<Header />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
