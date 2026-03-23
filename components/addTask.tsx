"use client";

import { IAddTaskProps } from "@/app/types/add-task.types";
import { Plus } from "lucide-react";
import useTaskUIController from "./hooks/task-ui-controller";

export default function AddTask({ period }: IAddTaskProps) {
	const { startCreatingTask } = useTaskUIController();
	const onClick = () => startCreatingTask(period);

	return (
		<li
			className="flex gap-1 items-center max-h-10 text-dark-500 bg-dark-50 hover:bg-dark-100 hover:text-dark-700 rounded-md py-[10px] px-3 select-none"
			onClick={onClick}
		>
			<Plus size={16} />
			<span>Add new task</span>
		</li>
	);
}
