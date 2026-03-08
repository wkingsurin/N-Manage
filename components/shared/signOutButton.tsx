'use client'

import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface ISignOutProps {
	children: string;
}

export default function SignOutButton({ children }: ISignOutProps) {
	return (
		<Button
			onClick={() => {
        signOut({ redirect: false })
        redirect('/sign-in')
      }}
		>
			{children}
		</Button>
	);
}
