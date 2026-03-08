import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";
import SignOutButton from "@/components/shared/signOutButton";

export default async function ProtectedComponent() {
	const session = await auth();

	if (!session) {
		redirect("/sign-in", RedirectType.replace);
	}

	return (
		<div>
			<h1>Welocme, `${session.user?.email}`</h1>
			<SignOutButton>Sign out</SignOutButton>
		</div>
	);
}
