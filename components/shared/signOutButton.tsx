"use client";

import { redirect, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

import { ISignOutProps } from "@/app/types/sign-out-props.types";

export default function SignOutButton({ children, className }: ISignOutProps) {
	const router = useRouter();

	const handleLogout = async () => {
		await signOut({ redirect: false });
		router.refresh();
		redirect("/sign-in");
	};

	return (
		<Button onClick={handleLogout} className={`${className}`}>
			{children}
		</Button>
	);
}
