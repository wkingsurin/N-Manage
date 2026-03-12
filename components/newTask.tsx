import AddTask from "./addTask";
import CreateTask from "./createTask";

import { INewTaskProps } from "@/app/types/new-task-props";

export default function NewTask({
	isCreating,
	onChangeText,
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
					onChange={onChangeText}
					onAddNewTask={onAddNewTask}
					onCloseNewTask={onCloseNewTask}
				/>
			)}
		</>
	);
}
