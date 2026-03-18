import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/components/providers/session-provider";

import Header from "@/components/header";
import { NewTaskProvider } from "@/components/providers/new-task-provider";

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
	return (
		<html lang="en">
			<body className={`${poppins.variable} ${inter.variable} antialiased`}>
				<AuthProvider>
					<Header />
					<NewTaskProvider>{children}</NewTaskProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
