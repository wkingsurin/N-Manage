import { ITask } from "./task.types";

export interface ITaskProps {
	data: ITask;
	editingTaskId: string | null;
	setEditingTaskId: (id: string | null) => void;
}
