import { ITask } from "./task.types";

export interface ITaskProps {
	data: ITask;
	isEditing: boolean;
	setEditingTaskId: (id: string | null) => void;
	closeTaskSnippet: () => void;
}
