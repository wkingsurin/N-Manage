'use client'

import { CalendarClock, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import SignOutButton from "./shared/signOutButton";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

export default function Header() {
	const {data: session} = useSession()

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
				<span className="text-dark-500">Hello, {session.user?.email}</span>
				<User className="stroke-dark" />
			</div>
			<Link href="/sign-in">
				<SignOutButton className="bg-overdue hover:bg-overdue-700">
					Sign out
				</SignOutButton>
			</Link>
		</>
	);

	return (
		<header className="h-15 shadow-md mb-[10px]">
			<div className="container box-border px-4 mx-auto h-full flex justify-between items-center">
				<Link href="/" className="flex gap-1 items-center">
					<CalendarClock className="stroke-dark" />
					<p className="text-dark">N Manage</p>
				</Link>
				<div className="flex gap-4">{signBlock}</div>
			</div>
		</header>
	);
}
