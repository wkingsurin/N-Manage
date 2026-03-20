import AddTask from "./addTask";
import CreateTask from "./createTask";

import { INewTaskProps } from "@/app/types/new-task.types";

export default function NewTask({
	isCreating,
	openTaskSnippet,
	closeTaskEditing,
	closeTaskSnippet,
}: INewTaskProps) {
	return (
		<>
			{!isCreating ? (
				<AddTask onClick={openTaskSnippet} />
			) : (
				<CreateTask
					closeTaskEditing={closeTaskEditing}
					closeTaskSnippet={closeTaskSnippet}
				/>
			)}
		</>
	);
}
