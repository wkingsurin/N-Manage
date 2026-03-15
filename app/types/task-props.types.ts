import { ITask } from "./task.types";

export interface ITaskProps {
	data: ITask;
	onClickEdit: (id: string, text?: string) => void;
	onComplete: (id: string) => void;
}
