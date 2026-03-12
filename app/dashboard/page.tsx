import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

import Card from "@/components/card";

export default async function Dashboard() {
	const session = await auth();

	if (!session) {
		redirect("/sign-in", RedirectType.replace);
	}

	return (
		<div className="w-full" style={{ height: "calc(100vh - 60px - 10px)" }}>
			<div className="container mx-auto h-[100%] pb-[10px] box-border px-4">
				<div className="flex flex-col items-start text-dark bg-white broder border-dark-50 shadow-md rounded-md h-[100%]">
					<h1 className="font-poppins font-semibold text-xl py-4 px-5">
						My Board
					</h1>
					<hr className="w-full h-1 bg-dark-50" />
					<div className="flex w-full p-3 gap-4 items-start overflow-hidden">
						<Card title="Today" period="today" />
						<Card title="This week" period="week" />
						<Card title="This month" period="month" />
					</div>
				</div>
			</div>
		</div>
	);
}
