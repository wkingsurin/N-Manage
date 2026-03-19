import { ITask } from "./task.types";

export interface ICardsListProps {
	tasksUI: ITask[];
}

export interface ICardsType {
	title: string;
	period: "today" | "week" | "month";
}

export interface IDraftTask {
	id: string | null;
	text: string;
}
