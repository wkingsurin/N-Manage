import { ITask } from "./task.types";

export interface ICardProps {
	title: string;
	period: "today" | "week" | "month";
	tasksFromDB: ITask[]
}
