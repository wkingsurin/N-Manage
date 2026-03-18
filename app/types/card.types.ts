import { ITask } from "./task.types";

export interface ICardProps {
	title: string;
	period: "today" | "week" | "month";
	tasksFromDB: ITask[];
	editingTaskId: string | null;
	setEditingTaskId: (id: string | null) => void;
}
