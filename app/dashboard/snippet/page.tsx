"use client";

import CreateTask from "@/components/createTask";
import useTaskUIController from "@/components/hooks/task-ui-controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SnippetPage() {
	const { creatingTaskTab } = useTaskUIController();
	const title = "Creating Task";

	return (
		<div
			datatype-id={creatingTaskTab}
			className="flex flex-col w-full shrink-0 sm:max-h-[100%] scroll-ml-3 bg-pale-blue border rounded-md border-dark-50 snap-start snap-always scroll-mt-3 sm:w-[33.333%] sm:shrink"
		>
			<span className="font-poppins font-semibold text-base p-3 bg-dark-100 rounded-md">
				{title}
			</span>
			<div className="overflow-y-auto touch-pan-y p-3 relative scrollbar-hide desktop-scrollbar">
				{creatingTaskTab ? (
					<CreateTask period={creatingTaskTab} href="/dashboard" />
				) : (
					<>
						{" "}
						<h1>Unable to create task</h1>
						<Link href="/dashboard">
							<Button>Back to Dashboard</Button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
