import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

import { getTasks } from "../actions/task.actions";
import { mapTaskFromDB } from "../mappers/task.mapper";
import { TaskSnippetProvider } from "@/components/providers/task-snippet-provider";
import CardsList from "@/components/cardsList";

export default async function Dashboard() {
	const session = await auth();

	if (!session) {
		redirect("/sign-in", RedirectType.replace);
	}

	const tasks = await getTasks();
	const tasksUI = tasks.map(mapTaskFromDB);

	return (
		<TaskSnippetProvider>
			<div className="w-full" style={{ height: "calc(100vh - 60px - 10px)" }}>
				<div className="container mx-auto h-[100%] pb-[10px] box-border px-4">
					<div className="flex flex-col items-start text-dark bg-white broder border-dark-50 shadow-md rounded-md h-[100%]">
						<h1 className="font-poppins font-semibold text-xl py-4 px-5">
							My Board
						</h1>
						<hr className="w-full h-1 bg-dark-50" />
						<div className="flex w-full p-3 gap-4 items-start overflow-hidden">
							<CardsList tasksUI={tasksUI} />
						</div>
					</div>
				</div>
			</div>
		</TaskSnippetProvider>
	);
}
