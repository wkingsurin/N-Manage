import { Period } from "./shared.types";

export interface ITask {
	id: string;
	text: string;
	edit: boolean;
	status: string;
	period: Period;
}

export interface ITaskProps {
	data: ITask;
}

export interface UpdateTaskTextarea {
	id: string;
	title: string;
}

export interface UpdateTaskStatus {
	id: string;
	status: string;
}
