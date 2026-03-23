import { ID, Period } from "./shared.types";
import { ITask } from "./task.types";

export interface ICardsListProps {
	tasksUI: ITask[];
}

export interface ICardsType {
	title: string;
	period: Period;
}

export interface IDraftTask {
	id: ID;
	text: string;
}
