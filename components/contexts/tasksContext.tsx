import { createContext } from "react";

interface ITask {
	id: string;
	text: string;
	edit: boolean;
	status: string;
	period: string;
}

interface TasksContextType {
	tasks: ITask[];
	onClickEditTask: (id: string) => void;
	onChangeTextTask: (text: string) => void;
	onComplete: (id: string) => void;
	addNewTask: (newTask: ITask) => void;
}

export const TasksContext = createContext<TasksContextType | null>(null);
