import { ITask } from "./task";

export interface TasksContextType {
	tasks: ITask[];
	onClickEditTask: (id: string) => void;
	onChangeTextTask: (text: string) => void;
	onComplete: (id: string) => void;
	addNewTask: (newTask: ITask) => void;
}
