"use client";

import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

import { ISignOutProps } from "@/app/types/sign-out-props";

export default function SignOutButton({ children, className }: ISignOutProps) {
	return (
		<Button
			onClick={() => {
				signOut({ redirect: false });
				redirect("/sign-in");
			}}
			className={`${className}`}
		>
			{children}
		</Button>
	);
}
