import AddTask from "./addTask";
import CreateTask from "./createTask";

import { INewTaskProps } from "@/app/types/new-task.types";

export default function NewTask({ isCreating, period }: INewTaskProps) {
	return (
		<div className="hidden sm:block">
			{!isCreating ? (
				<AddTask period={period} />
			) : (
				<CreateTask period={period} />
			)}
		</div>
	);
}
