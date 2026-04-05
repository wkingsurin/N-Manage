import { Period } from "./shared.types";

export interface ITask {
	id: string;
	text: string;
	status: string;
	period: Period;
}

export interface ITaskProps {
	id: string;
	isMobile?: boolean;
}

export interface UpdateTaskTextarea {
	id: string;
	title: string;
}

export interface UpdateTaskStatus {
	id: string;
	status: string;
}
