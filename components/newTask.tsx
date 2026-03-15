import AddTask from "./addTask";
import CreateTask from "./createTask";

import { INewTaskProps } from "@/app/types/new-task-props.types";

export default function NewTask({
	isCreating,
	onCreateNewTask,
	onAddNewTask,
	onCloseNewTask,
}: INewTaskProps) {
	return (
		<>
			{!isCreating ? (
				<AddTask onClick={onCreateNewTask} />
			) : (
				<CreateTask
					onAddNewTask={onAddNewTask}
					onCloseNewTask={onCloseNewTask}
				/>
			)}
		</>
	);
}
