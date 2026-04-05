import AddTask from "./addTask";
import CreateTask from "./createTask";

import { INewTaskProps } from "@/app/types/new-task.types";

export default function NewTask({ isOpened, period }: INewTaskProps) {
	return (
		<div className="hidden sm:block h-[50[x]">
			{!isOpened ? <AddTask period={period} /> : <CreateTask period={period} />}
		</div>
	);
}
