import { ITask } from "./task.types";

export interface ICardsListProps {
	tasksUI: ITask[];
}

export interface ICardsType {
	title: string;
	period: "today" | "week" | "month";
}
