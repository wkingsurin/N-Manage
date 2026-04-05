"use client";

import { Plus } from "lucide-react";
import { useTasksUIStore } from "@/lib/tasks.store";
import { Period } from "@/app/types/shared.types";

interface IProps {
	period: Period;
}

export default function AddTask({ period }: IProps) {
	const onClick = () => useTasksUIStore.getState().startCreatingTask(period);

	return (
		<li
			className="flex gap-1 items-center max-h-10 text-dark-500 bg-dark-50 dark:text-surface-300 dark:bg-dark-500 hover:bg-dark-100 hover:dark:bg-dark hover:text-dark-500 hover:dark:text-surface-500 rounded-md py-[10px] px-3 select-none"
			onClick={onClick}
		>
			<Plus size={16} />
			<span>Add new task</span>
		</li>
	);
}
