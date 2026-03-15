import { ITask } from "./task.types";

export interface TasksContextType {
	tasks: ITask[];
	onClickEditTask: (id: string | undefined) => void;
	onChangeTextTask: (text: string | undefined) => void;
	onComplete: (id: string | undefined) => void;
	addNewTask: (newTask: ITask) => void;
	closeTasksEditing: (id?: string | undefined) => void;
}
