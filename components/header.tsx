import { CalendarClock, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import SignOutButton from "./shared/signOutButton";
import { auth } from "@/auth";
import isMobileDevice from "./hooks/isMobileDevice";

export default async function Header() {
	const session = await auth();

	const isMobile = await isMobileDevice();
	if (isMobile) return null;

	const signBlock = !session ? (
		<>
			<Link href="/sign-in">
				<Button className="bg-primary text-white px-4 py-3 rounded-md">
					Sign in
				</Button>
			</Link>
			<Link href="/sign-up">
				<Button className="bg-secondary text-white px-4 py-3 rounded-md">
					Sign up
				</Button>
			</Link>
		</>
	) : (
		<>
			<div className="flex gap-[10px] items-center">
				<span className="text-dark-500 dark:text-surface-800">Hello, {session.user?.email}</span>
				<User className="stroke-dark dark:stroke-surface-800" />
			</div>
			<Link href="/sign-in">
				<SignOutButton className="dark:text-overdue dark:bg-overdue-200 bg-overdue hover:bg-overdue-700">
					Sign out
				</SignOutButton>
			</Link>
		</>
	);

	return (
		<header className="hidden h-15 shadow-md mb-[10px] sm:block dark:bg-dark dark:border-b-[0.5px] dark:border-surface-50">
			<div className="max-w-[1280px] w-full box-border px-4 mx-auto h-full flex justify-between items-center">
				<Link href="/" className="hidden gap-1 items-center sm:flex">
					<CalendarClock className="stroke-dark dark:stroke-surface-800" />
					<p className="text-dark dark:text-surface-800">N Manage</p>
				</Link>
				<div className="flex gap-4">{signBlock}</div>
			</div>
		</header>
	);
}
