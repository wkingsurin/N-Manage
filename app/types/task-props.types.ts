import { ITask } from "./task.types";

export interface ITaskProps {
	data: ITask;
	onComplete: (id: string) => void;
}
