import AddTask from "./addTask";
import CreateTask from "./createTask";

interface INewTaskProps {
	status: string;
	onCreateNewTask: () => void;
	onChangeText: (text: string) => void;
	onAddNewTask: () => void;
	onCloseNewTask: () => void;
}

export default function NewTask({
	status,
	onChangeText,
	onCreateNewTask,
	onAddNewTask,
	onCloseNewTask,
}: INewTaskProps) {
	return (
		<>
			{status === "add" ? (
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
