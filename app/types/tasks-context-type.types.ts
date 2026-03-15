import { ITask } from "./task.types";

export interface TasksContextType {
	tasks: ITask[];
	onClickEditTask: (id: string) => void;
	onChangeTextTask: (text: string) => void;
	onComplete: (id: string) => void;
	addNewTask: (newTask: ITask) => void;
	closeTasksEditing: (id?: string) => void;
}
